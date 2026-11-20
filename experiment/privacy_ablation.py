#!/usr/bin/env python3
"""Deterministic synthetic privacy-policy unit tests. NOT an LLM benchmark.

All records, purposes, actors and traces below are invented. Each scenario is a
single proposed data flow at one stage in a larger hypothetical agent run.
"""
import csv
import json
from dataclasses import dataclass
from pathlib import Path

@dataclass(frozen=True)
class Flow:
    name: str
    source: str
    sink: str
    label: str
    role_has_source_access: bool
    purpose_match: bool
    allowed: bool
    note: str

FLOWS = [
    Flow('public search -> answer','rag','public_answer','public',True,True,True,'Public material can be shared.'),
    Flow('authorized order status -> user','orders_db','private_answer','private',True,True,True,'Private reply to authenticated user.'),
    Flow('private record -> permitted local calc','customer_db','trusted_local_tool','private',True,True,True,'Authorized internal computation.'),
    Flow('public event -> public tool','public_file','external_api','public',True,True,True,'Public inputs to public service.'),
    Flow('aggregate safe count -> answer','analytics_db','public_answer','public',True,True,True,'Pre-reviewed nonsensitive aggregate.'),
    Flow('consented preference -> memory','preferences','consented_memory','private',True,True,True,'User explicitly permitted memory.'),
    Flow('payroll record -> public answer','payroll_db','public_answer','restricted',False,False,False,'Direct disclosure.'),
    Flow('private customer row -> outside API','customer_db','external_api','private',True,False,False,'Unauthorized tool argument.'),
    Flow('sensitive document -> shared memory','hr_file','shared_memory','restricted',False,False,False,'Persistent, broadly shared state.'),
    Flow('private account -> peer agent','accounts_db','peer_agent','private',True,False,False,'Unapproved recipient.'),
    Flow('restricted result -> final answer','claims_db','public_answer','restricted',True,False,False,'Output policy violation despite source access.'),
    Flow('private history -> logging API','memory','external_api','private',True,False,False,'Cross-session secret to external sink.'),
    Flow('derived restricted join -> peer','analytics_db','peer_agent','restricted',True,False,False,'Composition-sensitive derived fact.'),
    Flow('restricted schema -> log','warehouse','shared_log','restricted',False,False,False,'Metadata leakage.'),
    Flow('private draft -> public answer','private_file','public_answer','private',True,False,False,'Consent/purpose mismatch.'),
    Flow('restricted query -> third-party tool','analytics_db','external_api','restricted',True,False,False,'Intermediate query disclosure.'),
]

# Simplified clearance model: gate conditions are explicit toy policies, not a
# proof that real LLM agents can identify labels or comply with policies.
CLEARANCE = {
    'public_answer': {'public'},
    'private_answer': {'public','private'},
    'trusted_local_tool': {'public','private'},
    'external_api': {'public'},
    'shared_memory': {'public'},
    'peer_agent': {'public'},
    'shared_log': {'public'},
    'consented_memory': {'public','private'},
}

def decide(flow: Flow, control: str) -> bool:
    if control == 'none':
        return True
    if control == 'output_filter':
        return not (flow.sink in ('public_answer','private_answer') and flow.label == 'restricted')
    if control == 'source_scope':
        return flow.role_has_source_access
    if control == 'flow_policy':
        return (flow.role_has_source_access and flow.purpose_match
                and flow.label in CLEARANCE[flow.sink])
    raise ValueError(control)

CONTROLS = ['none','output_filter','source_scope','flow_policy']

def evaluate():
    rows = []
    for ctrl in CONTROLS:
        decisions = [(f, decide(f, ctrl)) for f in FLOWS]
        neg = [a for f,a in decisions if not f.allowed]
        pos = [a for f,a in decisions if f.allowed]
        rows.append({
            'control':ctrl,
            'prohibited_total':len(neg),
            'prohibited_blocked':sum(not a for a in neg),
            'prohibited_allowed':sum(a for a in neg),
            'benign_total':len(pos),
            'benign_allowed':sum(a for a in pos),
            'privacy_block_rate': round(100*sum(not a for a in neg)/len(neg),1),
            'benign_utility_rate':round(100*sum(a for a in pos)/len(pos),1)
        })
    return rows

if __name__ == '__main__':
    out=Path(__file__).parent
    rows=evaluate()
    (out/'ablation_results.json').write_text(json.dumps({
        'method':'deterministic synthetic flow-policy harness; not an LLM experiment',
        'n_prohibited':10,'n_benign':6,'results':rows
    },indent=2)+'\n')
    with (out/'ablation_results.csv').open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
    with (out/'scenario_decisions.csv').open('w',newline='') as f:
        w=csv.writer(f);w.writerow(['scenario','expected_allow','control','actual_allow','correct','note'])
        for flow in FLOWS:
            for ctrl in CONTROLS:
                actual=decide(flow,ctrl)
                w.writerow([flow.name,int(flow.allowed),ctrl,int(actual),int(actual==flow.allowed),flow.note])
    for r in rows: print(r)
    assert rows[-1]['prohibited_blocked'] == 10
    assert rows[-1]['benign_allowed'] == 6
    print('Sanity checks passed: 16 synthetic flow cases, 4 controls.')
