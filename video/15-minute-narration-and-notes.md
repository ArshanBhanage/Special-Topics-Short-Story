# Presentation narration and source notes

**Target duration:** approximately 15:20 at a measured pace. Record at least 15:00 total; keep the citations slide visible for the end.

**Caution:** All experimental claims on the slides must preserve the distinction between the published AgentLeak measurements and the synthetic deterministic toy.

## Slide 1
[0:00–0:40] In a normal chatbot, we often judge safety by reading the answer. With an autonomous agent, that is no longer enough. Today I will explain the survey Agents That Know Too Much and connect it to recent evaluation work. The core claim is simple: a clean answer is not proof of a clean execution.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 2
[0:40–1:23] Imagine asking for an order status. The answer looks harmless. But the agent might have copied the entire customer record to a third-party API, added a raw tool response to logs, or written private information to memory. Those are separate channels. This is the motivating privacy failure: the system can leak information without repeating it in the final response.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 3
[1:23–2:03] Nada Lahjouji and Ashwin Gerard Colaco at UC Irvine published the primary working-draft survey in June 2026. Its contribution is to organize privacy by data rather than by attack labels alone. There are three linked taxonomies: surfaces, outcomes, and governance mechanisms. Importantly, this is a survey and conceptual synthesis, not a new empirical leaderboard.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 4
[2:03–2:46] The assignment asks for recent survey work. The anchor is June 25, 2026. I compare it with the August architecture review, the September evaluation review, and the October memory survey. The first and fourth are arXiv preprints, while the two middle reviews are journal publications. They address the same practical question from different angles: how do you build and measure a useful agent without losing control of data?

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627 | Bajoria et al., 2026, https://doi.org/10.1007/s12559-026-10619-1 | Nageshwaran et al., 2026, https://doi.org/10.1007/s10462-026-11678-4 | Han et al., 2026, https://arxiv.org/html/2610.35089

## Slide 5
[2:46–3:25] The primary paper enumerates six surfaces. Database rows and schemas, ordinary files and tables, RAG passages and embeddings, external tool calls, persistent memory, and communication among agents. Every surface stores a different sensitive unit. Notice memory and inter-agent messaging are both useful capabilities and new privacy paths. A single rule placed only on the final answer cannot govern these edges.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 6
[3:25–4:08] A surface is not the same as a disclosure outcome. The paper distinguishes direct leakage, intermediate-step leakage, schema and metadata, inference and aggregation, cross-surface composition, and purpose or consent violation. Attack vectors such as prompt injection and memory poisoning explain how a problem is triggered. Governance choices then target the actual data flow. Keeping those categories separate is one of the most useful lessons for practitioners.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 7
[4:08–4:55] I want to emphasize three categories that usually receive less attention. First, intermediate leakage happens during execution rather than in the answer. Second, metadata can be sensitive even when rows are masked. Third, composition can reveal a private fact when a sequence of individually reasonable operations is combined. Finally, privacy is also about purpose: using data for a customer-approved workflow does not grant permission for unrelated onward sharing.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 8
[4:55–5:35] The survey also identifies four common triggering vectors. Prompt injection happens when untrusted source content is followed as if it were an instruction. Memory poisoning influences a later run. Over-permissioned agents can access too much. A compromised peer can misuse messages shared between agents. These are categories of risk, not a how-to guide for attacks. The defensive response is to constrain each flow according to actual permissions and recipients.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 9
[5:35–6:22] The primary survey compares nine control families against six leakage outcomes. Filled dots indicate primary coverage, half dots partial applicability, and dashes a gap. This is a qualitative literature assessment, not a numerical test. Access control is strong at bounding exposure. Information-flow control is notable for intermediate and compositional leakage. Runtime gates, transformations, formal privacy, confidential retrieval, contextual reasoning, human approvals, and auditing complement those controls. The important detail is that no single row covers everything.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 10
[6:22–7:03] My recommendation is a layered design. First, use real user- and task-scoped access rules enforced at data connectors. Second, label sensitive values and check destination and purpose before an API call, memory write, or agent handoff. Third, audit decisions and require human approval for high-stakes operations. The model can propose actions; a separate deterministic boundary must decide if those actions are permitted. This reference stack is my synthesis, not an experimentally validated product.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627 | Bajoria et al., 2026, https://doi.org/10.1007/s12559-026-10619-1

## Slide 11
[7:03–7:51] AgentLeak, published in IEEE Access, instrumented coordinator-worker multi-agent systems across 1,000 scenarios, five language models, and 4,979 validated traces. It reported 68.8 percent leakage in inter-agent messages, versus 27.2 percent in final outputs. In 41.7 percent of the traces the final answer was clean but an internal channel leaked. These categories overlap and do not add to one hundred. These findings apply to the benchmark configuration; they are not universal deployment rates.

**Sources:** El Yagoubi et al., IEEE Access 2026, https://doi.org/10.1109/ACCESS.2026.3704541

## Slide 12
[7:51–8:30] Results need to be interpreted within their measured scope. The study does not say that 68.8 percent is the leakage rate of all real deployments. It says that the tested coordination architectures contained sensitive information in channels that answer-only review cannot observe. It also reports lower final-output leakage in the tested multi-agent setting than in its single-agent baseline, even as total exposure rose. Architecture creates tradeoffs, not simple rankings.

**Sources:** El Yagoubi et al., IEEE Access 2026, https://doi.org/10.1109/ACCESS.2026.3704541

## Slide 13
[8:30–9:13] The primary paper maps 13 privacy benchmark families. Some focus on database query leakage, some on RAG, tools, memory, and inter-agent messages. The two right-hand columns show whether each tests a multi-step execution and an explicit policy. A benchmark may do its own job well, yet still not test an entire journey through SQL, retrieval, tools, memory, and handoffs under one policy. This figure is not a performance leaderboard; it is a capability coverage map.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627 | Debenedetti et al., NeurIPS 2024, https://proceedings.neurips.cc/paper_files/paper/2024/hash/97091a5177d8dc64b1da8bf3e1f6fb54-Abstract-Datasets_and_Benchmarks_Track.html

## Slide 14
[9:13–9:57] How do we score privacy without rewarding an agent that refuses everything? I propose measuring legitimate task utility alongside unauthorized disclosures and explicit policy compliance. We also need the cost of controls: latency, tool usage, and human burden. The September evaluation survey emphasizes capability, scoring paradigm, and environment. In its verified set of seventeen prominent benchmarks, none reported a complete standardized run-cost record, which illustrates the reproducibility gap.

**Sources:** Nageshwaran et al., 2026, https://doi.org/10.1007/s10462-026-11678-4 | Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 15
[9:57–10:42] To make this explainable beyond slides, I built a tiny deterministic policy harness. All sixteen data-flow examples are invented. Ten should be blocked, six should be allowed. I then compare no enforcement, answer-only filtering, source access checks, and a policy gate that checks access, purpose, and allowed sensitivity for the destination. There is no LLM call and no claim this models real adversarial success rates. The code produces every case-level decision and aggregate CSV.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 16
[10:42–11:31] The toy results show the structural pattern. With no controls, zero of the ten forbidden flows are stopped. The final-answer filter stops two, because the other violations happen somewhere else. Source scoping stops three. The combined flow gate blocks all ten while retaining six permitted cases. That perfect score is entirely a consequence of explicitly constructed cases and policy labels. Real systems need to solve inaccurate labeling, derived information, consent ambiguity, repeated-query inference, and uncertain tool behavior. This is a unit test, not evidence of perfect security.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 17
[11:31–12:14] Here is the architecture I would build. The user identity and task purpose travel with the request. The planner proposes a step. Before execution, a policy gate verifies source permissions, data labels, recipient, and purpose. The executor uses scoped credentials. Audit trails contain decisions and policy versions, not casually copied sensitive payloads. Memory writes require consent and retention decisions, and reads check requester permissions. The same gate applies to other agents.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627 | Bajoria et al., 2026, https://doi.org/10.1007/s12559-026-10619-1 | Han et al., 2026, https://arxiv.org/html/2610.35089

## Slide 18
[12:14–12:56] The October memory survey distinguishes nonparametric storage, parametric mechanisms, and memory for agent evolution. Its overarching idea is a lifecycle: construction, management, retrieval, forgetting, governance, and evaluation. The privacy lesson I draw is to enforce policy when memory is written and when it is read. A fact saved legitimately for one task may be inappropriate when a different agent retrieves it later. Deletion, correction, and isolation therefore deserve explicit tests.

**Sources:** Han et al., 2026, https://arxiv.org/html/2610.35089 | Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627

## Slide 19
[12:56–13:48] A good research short story should challenge its own claims. The primary survey is a working draft and its coverage matrix is qualitative. It highlights missing whole-workflow guarantees and benchmarks. The evaluation survey independently warns that benchmark scores depend on validity, non-determinism, contamination, and run-cost reporting. My demonstration simplifies away the hard part: assigning accurate labels and enforcing them on free-form language. Therefore the experiment illustrates a design principle but cannot justify a performance claim about any model or real product.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627 | Nageshwaran et al., 2026, https://doi.org/10.1007/s10462-026-11678-4

## Slide 20
[13:48–14:30] My closing research proposal is a privacy benchmark built around controlled data movement. Instead of isolated tasks, an agent should execute an end-to-end journey that crosses a database, retrieval, a tool, persistent memory, and an agent handoff. Evaluators should inspect all intermediate channels against an explicit policy. They should score legitimate task success, leakage, policy adherence, and reproducible operational cost. This is the concrete open problem suggested by the synthesis.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627 | Nageshwaran et al., 2026, https://doi.org/10.1007/s10462-026-11678-4 | Han et al., 2026, https://arxiv.org/html/2610.35089

## Slide 21
[14:30–15:12] To conclude: agents are powerful because they move data through tools and persistent workflows. That makes output-only safety checks incomplete. The source paper surface-outcome-control taxonomies give us a map, AgentLeak provides evidence that internal channels matter, and recent evaluation and memory surveys show why this is still an open engineering problem. My recommendation is straightforward: trace flows, enforce policies outside the model, evaluate privacy with utility and cost, and govern memory for its entire lifetime. Thank you.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627 | El Yagoubi et al., IEEE Access 2026, https://doi.org/10.1109/ACCESS.2026.3704541 | Nageshwaran et al., 2026, https://doi.org/10.1007/s10462-026-11678-4 | Han et al., 2026, https://arxiv.org/html/2610.35089

## Slide 22
[15:12–15:23] This final slide lists all primary research sources. The GitHub repository includes the article, diagrams, the synthetic ablation, reproducible CSV, and this presentation. Thank you.

**Sources:** Lahjouji & Colaco, 2026, https://arxiv.org/html/2606.26627 | Bajoria et al., 2026, https://doi.org/10.1007/s12559-026-10619-1 | Nageshwaran et al., 2026, https://doi.org/10.1007/s10462-026-11678-4 | Han et al., 2026, https://arxiv.org/html/2610.35089 | El Yagoubi et al., IEEE Access 2026, https://doi.org/10.1109/ACCESS.2026.3704541 | Debenedetti et al., NeurIPS 2024, https://proceedings.neurips.cc/paper_files/paper/2024/hash/97091a5177d8dc64b1da8bf3e1f6fb54-Abstract-Datasets_and_Benchmarks_Track.html
