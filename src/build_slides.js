/* Rebuildable presentation source. Requires pptxgenjs and the installed OpenAI slides helper. */
const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const { imageSizingContain, autoFontSize, warnIfSlideElementsOutOfBounds } = require('/home/oai/skills/slides/pptxgenjs_helpers');
const root = path.resolve(__dirname,'..');
const fig = n => path.join(root,'figures',n);
const out = path.join(root,'slides','Agent_Privacy_Short_Story.pptx');
const pptx = new pptxgen();
pptx.layout='LAYOUT_WIDE';
pptx.author='Arshan Bhanage';
pptx.subject='Original short story presentation on privacy risks and LLM agent data flows';
pptx.title='Your AI Agent Can Give a Clean Answer and Still Leak Your Data';
pptx.company='SJSU course assignment';
pptx.lang='en-US';
pptx.theme={headFontFace:'Aptos Display',bodyFontFace:'Aptos',lang:'en-US'};
pptx.defineSlideMaster({title:'BASE',background:{color:'FAFBFE'},objects:[]});
const C={navy:'132A41',blue:'236DD6',teal:'058C8C',red:'C04D5D',slate:'3B4D61',gray:'78879A',pale:'EAF2FC',mint:'E5F4F1',white:'FFFFFF',border:'DBE4EC'};
const W=13.333333,H=7.5;
const slides=[];
const S=(n,title,kicker='',caption='')=>{
 let s=pptx.addSlide('BASE');
 s.background={color:'FAFBFE'};
 s.addText(kicker.toUpperCase(),{x:.64,y:.38,w:10,h:.28,fontFace:'Aptos',fontSize:10.7,bold:true,color:C.teal,letterSpacing:2,margin:0});
 s.addText(title,{x:.64,y:.80,w:12,h:.83,fontFace:'Aptos Display',fontSize:28,bold:true,color:C.navy,margin:0,breakLine:false});
 s.addShape(pptx.ShapeType.line,{x:.64,y:6.96,w:12.05,h:0,line:{color:C.border,width:1}});
 s.addText('LLM AGENT PRIVACY  •  ARSHAN BHANAGE',{x:.64,y:7.08,w:8,h:.2,fontSize:8.5,color:C.gray,margin:0});
 s.addText(String(n).padStart(2,'0'),{x:12.10,y:7.07,w:.6,h:.21,fontSize:9.5,align:'right',bold:true,color:C.teal,margin:0});
 if(caption)s.addText(caption,{x:.65,y:6.69,w:12,h:.23,fontSize:8.5,color:C.gray,margin:0});
 return s;
};
function txt(s,t,x,y,w,h,size=16,color=C.slate,opts={}){
 s.addText(t,{x,y,w,h,fontFace:'Aptos',fontSize:size,color,margin:0,breakLine:false,fit:'shrink',...opts});
}
function card(s,x,y,w,h,heading,detail,color=C.blue){
 s.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:.11,fill:{color:C.white},line:{color:C.border,width:1}});
 s.addShape(pptx.ShapeType.roundRect,{x:x+.18,y:y+.19,w:.10,h:.10,rectRadius:.04,fill:{color},line:{color}});
 if (h < 1.12) {
  txt(s,heading,x+.40,y+.08,w-.55,.31,15,C.navy,{bold:true});
  txt(s,detail,x+.40,y+.48,w-.55,.23,10.5,C.slate);
 } else {
  txt(s,heading,x+.41,y+.14,w-.57,.46,17,C.navy,{bold:true});
  txt(s,detail,x+.25,y+.70,w-.50,h-.85,13,C.slate,{valign:'top'});
 }
}
function img(s,name,x=.8,y=1.68,w=11.75,h=4.9){
 s.addImage({path:fig(name),...imageSizingContain(fig(name),x,y,w,h)});
}
function notes(s,body,refs){
 s.addNotes(`${body}\n\n[Sources]\n${refs.map(r=>'- '+r).join('\n')}`);
 slides.push({body,refs});
}
const P='Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627';
const E='El Yagoubi et al., IEEE Access 2026, https://doi.org/10.1109/ACCESS.2026.3704541';
const V='Nageshwaran et al., 2026, https://doi.org/10.1007/s10462-026-11678-4';
const M='Han et al., 2026, https://arxiv.org/html/2610.35089';
const A='Bajoria et al., 2026, https://doi.org/10.1007/s12559-026-10619-1';
const D='Debenedetti et al., NeurIPS 2024, https://proceedings.neurips.cc/paper_files/paper/2024/hash/97091a5177d8dc64b1da8bf3e1f6fb54-Abstract-Datasets_and_Benchmarks_Track.html';

{
 const s=pptx.addSlide();s.background={color:C.navy};
 s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:.15,h:7.5,line:{color:C.teal},fill:{color:C.teal}});
 txt(s,'A RESEARCH SHORT STORY',.82,1.06,9,.35,13,'60D7D0',{bold:true,charSpacing:2});
 txt(s,'Your AI Agent Can Give a\nClean Answer — and Still\nLeak Your Data',.82,1.68,11.75,2.58,35,C.white,{bold:true,breakLine:false});
 txt(s,'Six data surfaces · nine defense families · real benchmark evidence\nplus one honest, reproducible toy ablation',.84,4.66,10.8,.76,18,'C8D7E6');
 txt(s,'Arshan Bhanage  |  November 2026',.84,6.65,10,.35,12,'A5BBCB');
 notes(s,'[0:00–0:40] In a normal chatbot, we often judge safety by reading the answer. With an autonomous agent, that is no longer enough. Today I will explain the survey Agents That Know Too Much and connect it to recent evaluation work. The core claim is simple: a clean answer is not proof of a clean execution.',[P]);
}
{
 const s=S(2,'One request. Many invisible disclosures.','The hook');
 card(s,.78,1.85,3.8,3.7,'THE REQUEST','“Summarize my order status.”\n\nThe user expects only an order number and delivery date.',C.teal);
 card(s,4.76,1.85,3.8,3.7,'THE INVISIBLE PATH','SQL → customer row → tool arguments → logs → long-term memory',C.blue);
 card(s,8.74,1.85,3.8,3.7,'THE QUESTION','Can we call this safe because the final text contains no secret?',C.red);
 txt(s,'A safety check at the end cannot undo a privacy leak earlier in the workflow.',1.08,5.91,11.1,.5,18,C.red,{bold:true,align:'center'});
 notes(s,'[0:40–1:23] Imagine asking for an order status. The answer looks harmless. But the agent might have copied the entire customer record to a third-party API, added a raw tool response to logs, or written private information to memory. Those are separate channels. This is the motivating privacy failure: the system can leak information without repeating it in the final response.',[P]);
}
{
 const s=S(3,'What the primary survey changes','The contribution');
 txt(s,'Most reviews classify attacks.\nThis survey classifies the data journey.',.87,1.8,11.5,1.45,28,C.navy,{bold:true});
 card(s,1.00,3.55,3.42,2.05,'SURFACES','Where does the agent touch sensitive data?',C.blue);
 card(s,4.94,3.55,3.42,2.05,'OUTCOMES','What is actually disclosed?',C.red);
 card(s,8.87,3.55,3.42,2.05,'GOVERNANCE','What can prevent or limit it?',C.teal);
 notes(s,'[1:23–2:03] Nada Lahjouji and Ashwin Gerard Colaco at UC Irvine published the primary working-draft survey in June 2026. Its contribution is to organize privacy by data rather than by attack labels alone. There are three linked taxonomies: surfaces, outcomes, and governance mechanisms. Importantly, this is a survey and conceptual synthesis, not a new empirical leaderboard.',[P]);
}
{
 const s=S(4,'Four recent perspectives, one engineering question','Paper selection');
 let rows=[
 ['JUN 2026','Agent privacy / data surfaces','Lahjouji & Colaco · arXiv preprint'],
 ['AUG 2026','Autonomy / tools / collaboration','Bajoria et al. · Cognitive Computation'],
 ['SEP 2026','Agent evaluation validity','Nageshwaran et al. · AI Review'],
 ['OCT 2026','Memory life cycle and governance','Han et al. · arXiv preprint']
 ];
 rows.forEach((r,i)=>{let y=1.77+i*1.04;card(s,.93,y,11.55,.88,r[0]+'  —  '+r[1],r[2],i===0?C.teal:C.blue);});
 notes(s,'[2:03–2:46] The assignment asks for recent survey work. The anchor is June 25, 2026. I compare it with the August architecture review, the September evaluation review, and the October memory survey. The first and fourth are arXiv preprints, while the two middle reviews are journal publications. They address the same practical question from different angles: how do you build and measure a useful agent without losing control of data?', [P,A,V,M]);
}
{
 const s=S(5,'Every connection creates a privacy decision','Taxonomy 1 · surfaces','Source: Lahjouji & Colaco (2026), Section 3. Original redraw.');img(s,'01-six-data-surfaces.png',.8,1.69,11.75,4.73);
 notes(s,'[2:46–3:25] The primary paper enumerates six surfaces. Database rows and schemas, ordinary files and tables, RAG passages and embeddings, external tool calls, persistent memory, and communication among agents. Every surface stores a different sensitive unit. Notice memory and inter-agent messaging are both useful capabilities and new privacy paths. A single rule placed only on the final answer cannot govern these edges.',[P]);
}
{
 const s=S(6,'Three axes; one connected threat model','Taxonomy 2 · outcomes','Original synthesis of Sections 3–5 in the primary survey.');img(s,'02-taxonomy.png',.8,1.7,11.75,4.66);
 notes(s,'[3:25–4:08] A surface is not the same as a disclosure outcome. The paper distinguishes direct leakage, intermediate-step leakage, schema and metadata, inference and aggregation, cross-surface composition, and purpose or consent violation. Attack vectors such as prompt injection and memory poisoning explain how a problem is triggered. Governance choices then target the actual data flow. Keeping those categories separate is one of the most useful lessons for practitioners.',[P]);
}
{
 const s=S(7,'The six ways an agent can disclose information','Disclosure outcomes');
 let a=[['01','Direct answer','Private fact sent to wrong user'],['02','Intermediate step','Secret passed in a tool argument'],['03','Schema / metadata','Private field names exposed'],['04','Inference','Aggregate reveals a small group'],['05','Composition','Safe steps combine into a secret'],['06','Purpose / consent','Permitted data used for wrong purpose']];
 a.forEach((r,i)=>{let x=.88+(i%3)*4.16,y=1.85+Math.floor(i/3)*2.08;card(s,x,y,3.80,1.79,r[0]+'   '+r[1],r[2],[C.blue,C.red,C.teal][i%3]);});
 notes(s,'[4:08–4:55] I want to emphasize three categories that usually receive less attention. First, intermediate leakage happens during execution rather than in the answer. Second, metadata can be sensitive even when rows are masked. Third, composition can reveal a private fact when a sequence of individually reasonable operations is combined. Finally, privacy is also about purpose: using data for a customer-approved workflow does not grant permission for unrelated onward sharing.',[P]);
}
{
 const s=S(8,'How those failures are triggered','Attack vectors ≠ outcomes');
 card(s,.88,1.96,5.54,1.72,'Untrusted retrieved content','An instruction is mistaken for authorized task data.',C.red);
 card(s,6.82,1.96,5.54,1.72,'Memory poisoning','Manipulated information persists into later sessions.',C.red);
 card(s,.88,4.00,5.54,1.72,'Excessive permissions','The agent can fetch much more than a task needs.',C.red);
 card(s,6.82,4.00,5.54,1.72,'Compromised peer agent','An internal handoff becomes an unauthorized recipient.',C.red);
 notes(s,'[4:55–5:35] The survey also identifies four common triggering vectors. Prompt injection happens when untrusted source content is followed as if it were an instruction. Memory poisoning influences a later run. Over-permissioned agents can access too much. A compromised peer can misuse messages shared between agents. These are categories of risk, not a how-to guide for attacks. The defensive response is to constrain each flow according to actual permissions and recipients.',[P]);
}
{
 const s=S(9,'Nine control families—not one magic shield','Governance map','Qualitative coverage from Lahjouji & Colaco, Table 5; not measured accuracy.');img(s,'03-control-coverage.png',.73,1.71,11.82,4.69);
 notes(s,'[5:35–6:22] The primary survey compares nine control families against six leakage outcomes. Filled dots indicate primary coverage, half dots partial applicability, and dashes a gap. This is a qualitative literature assessment, not a numerical test. Access control is strong at bounding exposure. Information-flow control is notable for intermediate and compositional leakage. Runtime gates, transformations, formal privacy, confidential retrieval, contextual reasoning, human approvals, and auditing complement those controls. The important detail is that no single row covers everything.',[P]);
}
{
 const s=S(10,'My default production defense stack','Design recommendation');
 card(s,.90,1.85,3.78,3.70,'1. SCOPED ACCESS','User-bound credentials\nPurpose-bound permissions\nRow/column/document filters',C.blue);
 card(s,4.77,1.85,3.78,3.70,'2. FLOW POLICY','Label sensitive values\nCheck each recipient\nGate memory and peer messages',C.teal);
 card(s,8.64,1.85,3.78,3.70,'3. TRACE + REVIEW','Policy-safe audit records\nRed-team intermediate channels\nRequire approval for high risk',C.red);
 txt(s,'The model proposes. Deterministic services decide what may execute.',1.04,5.95,11.1,.44,18,C.navy,{bold:true,align:'center'});
 notes(s,'[6:22–7:03] My recommendation is a layered design. First, use real user- and task-scoped access rules enforced at data connectors. Second, label sensitive values and check destination and purpose before an API call, memory write, or agent handoff. Third, audit decisions and require human approval for high-stakes operations. The model can propose actions; a separate deterministic boundary must decide if those actions are permitted. This reference stack is my synthesis, not an experimentally validated product.',[P,A]);
}
{
 const s=S(11,'A real benchmark: internal leakage is measurable','AgentLeak · IEEE Access (June 2026)','4,979 validated traces · five LLMs · four domains; reported study measurements.');img(s,'04-agentleak-findings.png',.85,1.72,11.63,4.65);
 notes(s,'[7:03–7:51] AgentLeak, published in IEEE Access, instrumented coordinator-worker multi-agent systems across 1,000 scenarios, five language models, and 4,979 validated traces. It reported 68.8 percent leakage in inter-agent messages, versus 27.2 percent in final outputs. In 41.7 percent of the traces the final answer was clean but an internal channel leaked. These categories overlap and do not add to one hundred. These findings apply to the benchmark configuration; they are not universal deployment rates.',[E]);
}
{
 const s=S(12,'What these measurements do—and do not—prove','Interpretation');
 card(s,.89,1.94,5.52,3.34,'SUPPORTED','Output-only review misses exposures in the evaluated multi-agent traces.\n\nInternal channel instrumentation matters.',C.teal);
 card(s,6.89,1.94,5.52,3.34,'NOT SUPPORTED','That every multi-agent system leaks 68.8%.\n\nThat one model or one architecture is always unsafe.',C.red);
 txt(s,'A clean answer is a weak proxy for end-to-end privacy.',1.15,5.72,11,.42,18,C.navy,{bold:true,align:'center'});
 notes(s,'[7:51–8:30] Results need to be interpreted within their measured scope. The study does not say that 68.8 percent is the leakage rate of all real deployments. It says that the tested coordination architectures contained sensitive information in channels that answer-only review cannot observe. It also reports lower final-output leakage in the tested multi-agent setting than in its single-agent baseline, even as total exposure rose. Architecture creates tradeoffs, not simple rankings.',[E]);
}
{
 const s=S(13,'Benchmark coverage is fragmented','The evaluation gap','Adapted from 13 benchmark families in Table 6 of the primary survey.');img(s,'05-benchmark-gap.png',1.2,1.72,10.95,4.75);
 notes(s,'[8:30–9:13] The primary paper maps 13 privacy benchmark families. Some focus on database query leakage, some on RAG, tools, memory, and inter-agent messages. The two right-hand columns show whether each tests a multi-step execution and an explicit policy. A benchmark may do its own job well, yet still not test an entire journey through SQL, retrieval, tools, memory, and handoffs under one policy. This figure is not a performance leaderboard; it is a capability coverage map.',[P,D]);
}
{
 const s=S(14,'A leaderboard needs four measurements together','Evaluation blueprint');
 let a=[['TASK UTILITY','Did the legitimate workflow succeed?'],['PRIVACY VIOLATIONS','Did data reach unauthorized channels?'],['POLICY COMPLIANCE','Were actor, purpose and consent respected?'],['OPERATING COST','Latency, tool calls, approvals, budget?']];
 a.forEach((v,i)=>card(s,.89+(i%2)*6.03,1.83+Math.floor(i/2)*2.10,5.60,1.78,v[0],v[1],[C.blue,C.red,C.teal,C.blue][i]));
 txt(s,'Evaluate what • how • where  — and rerun under a controlled setup.',1.06,6.20,11.2,.34,16,C.slate,{italic:true,align:'center'});
 notes(s,'[9:13–9:57] How do we score privacy without rewarding an agent that refuses everything? I propose measuring legitimate task utility alongside unauthorized disclosures and explicit policy compliance. We also need the cost of controls: latency, tool usage, and human burden. The September evaluation survey emphasizes capability, scoring paradigm, and environment. In its verified set of seventeen prominent benchmarks, none reported a complete standardized run-cost record, which illustrates the reproducibility gap.',[V,P]);
}
{
 const s=S(15,'A reproducible, deliberately limited demonstration','Synthetic ablation · not an LLM test');
 card(s,.96,1.94,5.3,3.56,'FIXED INPUTS','16 synthetic flow cases\n10 prohibited + 6 permitted\nDeclared actor, purpose, data label, sink\nNo network, no model, no private data',C.blue);
 card(s,6.77,1.94,5.3,3.56,'FOUR CONTROLS','None\nOutput-only filter\nSource permission check\nLabel + purpose + destination gate',C.teal);
 txt(s,'Reproduce:  python experiment/privacy_ablation.py',2.00,5.98,9.7,.40,17,C.navy,{bold:true,align:'center'});
 notes(s,'[9:57–10:42] To make this explainable beyond slides, I built a tiny deterministic policy harness. All sixteen data-flow examples are invented. Ten should be blocked, six should be allowed. I then compare no enforcement, answer-only filtering, source access checks, and a policy gate that checks access, purpose, and allowed sensitivity for the destination. There is no LLM call and no claim this models real adversarial success rates. The code produces every case-level decision and aggregate CSV.',[P]);
}
{
 const s=S(16,'Output filtering cannot protect earlier tool calls','Synthetic ablation result','Real computed results from 16 synthetic fixtures. Not a claim about LLM safety.');img(s,'06-synthetic-ablation.png',.79,1.70,11.76,4.75);
 notes(s,'[10:42–11:31] The toy results show the structural pattern. With no controls, zero of the ten forbidden flows are stopped. The final-answer filter stops two, because the other violations happen somewhere else. Source scoping stops three. The combined flow gate blocks all ten while retaining six permitted cases. That perfect score is entirely a consequence of explicitly constructed cases and policy labels. Real systems need to solve inaccurate labeling, derived information, consent ambiguity, repeated-query inference, and uncertain tool behavior. This is a unit test, not evidence of perfect security.',[P]);
}
{
 const s=S(17,'A reference architecture: policy outside the model','Design blueprint','Original recommended architecture; not evaluated in the cited research.');img(s,'07-policy-architecture.png',.78,1.7,11.75,4.7);
 notes(s,'[11:31–12:14] Here is the architecture I would build. The user identity and task purpose travel with the request. The planner proposes a step. Before execution, a policy gate verifies source permissions, data labels, recipient, and purpose. The executor uses scoped credentials. Audit trails contain decisions and policy versions, not casually copied sensitive payloads. Memory writes require consent and retention decisions, and reads check requester permissions. The same gate applies to other agents.',[P,A,M]);
}
{
 const s=S(18,'Memory turns a one-time risk into a long-term risk','October 2026 survey');
 let a=[['WRITE','What information is allowed in?'],['MANAGE','Correct, consolidate, expire, delete'],['READ','Who can retrieve it later?']];
 a.forEach((z,i)=>{card(s,.90+i*4.13,2.10,3.79,2.65,z[0],z[1],[C.blue,C.teal,C.red][i]);});
 txt(s,'Persistent memory makes privacy a lifecycle requirement, not a prompt setting.',1.1,5.54,11.1,.8,21,C.navy,{bold:true,align:'center'});
 notes(s,'[12:14–12:56] The October memory survey distinguishes nonparametric storage, parametric mechanisms, and memory for agent evolution. Its overarching idea is a lifecycle: construction, management, retrieval, forgetting, governance, and evaluation. The privacy lesson I draw is to enforce policy when memory is written and when it is read. A fact saved legitimately for one task may be inappropriate when a different agent retrieves it later. Deletion, correction, and isolation therefore deserve explicit tests.',[M,P]);
}
{
 const s=S(19,'Where this research—and my toy—fall short','Limitations and open problems');
 card(s,.90,1.92,5.55,3.87,'LITERATURE LIMITATIONS','No single full-journey privacy benchmark\nControl families at different maturity levels\nCross-policy composition is unresolved\nEvaluation reliability and cost gaps',C.red);
 card(s,6.83,1.92,5.55,3.87,'TOY LIMITATIONS','Labels are perfect by construction\nNo genuine natural-language behavior\nNo model uncertainty or attack adaptation\nNo real latency or financial cost',C.blue);
 notes(s,'[12:56–13:48] A good research short story should challenge its own claims. The primary survey is a working draft and its coverage matrix is qualitative. It highlights missing whole-workflow guarantees and benchmarks. The evaluation survey independently warns that benchmark scores depend on validity, non-determinism, contamination, and run-cost reporting. My demonstration simplifies away the hard part: assigning accurate labels and enforcing them on free-form language. Therefore the experiment illustrates a design principle but cannot justify a performance claim about any model or real product.',[P,V]);
}
{
 const s=S(20,'The next agent benchmark must follow the data','Research agenda');
 let q=['One stated policy, across every data surface','Inspect SQL, tool calls, memory and inter-agent handoffs','Measure privacy, utility, robustness and run cost','Report trace provenance and reproducibility'];
 q.forEach((s0,i)=>{s.addShape(pptx.ShapeType.roundRect,{x:.94,y:1.87+i*1.04,w:11.47,h:.76,fill:{color:i%2?C.mint:C.pale},line:{color:C.border}});txt(s,String(i+1).padStart(2,'0'),1.15,2.05+i*1.04,.55,.36,17,C.teal,{bold:true});txt(s,s0,2.02,2.04+i*1.04,10.0,.35,18,C.navy,{bold:true});});
 notes(s,'[13:48–14:30] My closing research proposal is a privacy benchmark built around controlled data movement. Instead of isolated tasks, an agent should execute an end-to-end journey that crosses a database, retrieval, a tool, persistent memory, and an agent handoff. Evaluators should inspect all intermediate channels against an explicit policy. They should score legitimate task success, leakage, policy adherence, and reproducible operational cost. This is the concrete open problem suggested by the synthesis.',[P,V,M]);
}
{
 const s=S(21,'A clean answer is not proof of a clean execution','Takeaways');
 txt(s,'01   Trace every data flow, not just the response.\n\n02   Put deterministic policy boundaries outside the LLM.\n\n03   Score privacy + legitimate utility together.\n\n04   Treat long-term memory as governed data.',1.16,1.88,11.2,4.05,22,C.navy,{bold:true});
 txt(s,'Primary paper: arxiv.org/abs/2606.26627',1.2,6.23,10,.28,12,C.teal);
 notes(s,'[14:30–15:12] To conclude: agents are powerful because they move data through tools and persistent workflows. That makes output-only safety checks incomplete. The source paper surface-outcome-control taxonomies give us a map, AgentLeak provides evidence that internal channels matter, and recent evaluation and memory surveys show why this is still an open engineering problem. My recommendation is straightforward: trace flows, enforce policies outside the model, evaluate privacy with utility and cost, and govern memory for its entire lifetime. Thank you.',[P,E,V,M]);
}
{
 const s=S(22,'Sources, reproducibility, next steps','References');
 txt(s,'[1] Lahjouji & Colaco (Jun 2026) • arXiv:2606.26627\n[2] Bajoria et al. (Aug 2026) • Cognitive Computation\n[3] Nageshwaran et al. (Sep 2026) • Artificial Intelligence Review\n[4] Han et al. (Oct 2026) • arXiv:2610.35089\n[5] El Yagoubi et al. (Jun 2026) • IEEE Access / AgentLeak\n[6] Debenedetti et al. (2024) • NeurIPS / AgentDojo',1.04,1.80,11.55,3.9,17,C.navy,{breakLine:false});
 txt(s,'Code + figures + article + speaker notes are included in this repository.',1.07,6.00,11,.5,15,C.teal,{bold:true});
 notes(s,'[15:12–15:23] This final slide lists all primary research sources. The GitHub repository includes the article, diagrams, the synthetic ablation, reproducible CSV, and this presentation. Thank you.',[P,A,V,M,E,D]);
}

pptx.writeFile({fileName:out}).then(()=>{
 let m=['# Presentation narration and source notes','','**Target duration:** approximately 15:20 at a measured pace. Record at least 15:00 total; keep the citations slide visible for the end.','', '**Caution:** All experimental claims on the slides must preserve the distinction between the published AgentLeak measurements and the synthetic deterministic toy.',''];
 slides.forEach((p,i)=>{m.push(`## Slide ${i+1}`,p.body,'','**Sources:** '+p.refs.join(' | '),'');});
 fs.writeFileSync(path.join(root,'video','15-minute-narration-and-notes.md'),m.join('\n'));
 console.log(`Generated ${slides.length} slides and narration notes: ${out}`);
}).catch(e=>{console.error(e);process.exit(1)});
