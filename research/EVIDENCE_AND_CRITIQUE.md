# Evidence ledger, critique, and provenance

**Research date:** Nov 19, 2026. This document keeps survey-derived findings, empirically published measurements, and independent toy work separate.

## Source type and study contribution

| Key | Source | Date | Status | Used for |
| --- | --- | --- | --- | --- |
| [1] | [Lahjouji & Colaco, *Agents That Know Too Much*](https://arxiv.org/abs/2606.26627) | June 25, 2026 | arXiv **working-draft preprint** | 6 surfaces, 6 outcomes, 9 mechanism families, qualitative benchmark/control coverage |
| [2] | [Bajoria et al., *From Language Models to Agentic AI*](https://doi.org/10.1007/s12559-026-10619-1) | Aug 24, 2026 | peer-reviewed journal survey | agent architecture and collaboration context |
| [3] | [Nageshwaran et al., *Large language model agent evaluation and benchmarking*](https://doi.org/10.1007/s10462-026-11678-4) | Sep 15, 2026 | peer-reviewed journal systematic survey | evaluation dimensions, scoring issues, 17-benchmark examination and missing standardized run costs |
| [4] | [Han et al., *Learning to Remember*](https://arxiv.org/abs/2610.35089) | Oct 26, 2026 | arXiv preprint | memory categories and lifecycle |
| [5] | [El Yagoubi et al., *AgentLeak*](https://doi.org/10.1109/ACCESS.2026.3704541) | June 17, 2026 | peer-reviewed IEEE Access benchmark | 1,000 scenarios, 4,979 traces, 68.8% inter-agent, 27.2% final answer, 41.7% internal-only with clean final |
| [6] | [Debenedetti et al., *AgentDojo*](https://proceedings.neurips.cc/paper_files/paper/2024/hash/97091a5177d8dc64b1da8bf3e1f6fb54-Abstract-Datasets_and_Benchmarks_Track.html) | 2024 | peer-reviewed NeurIPS benchmark paper | relevant historical evaluation technique; NOT a paper meeting the date requirement |

## Scope of numerical findings

- **AgentLeak** percentages describe occurrence across *that study's tested trace corpus*; outcome categories can overlap, so totals do not sum to 100. Underlying simulator/model mix, scenario design, and annotation protocol affect generalization. We have not reproduced this study.
- **17 benchmark evaluations** in the September survey: the original article's audit of benchmark reporting (not a result from our project). Terms such as "complete run cost" follow its criteria; do not infer 17/17 lacked every individual cost component.
- **13 benchmark families** in the primary survey: source-derived *categorical coverage*, not a scored contest. The article reports how the surveys organize the field, not winners.
- **16-case synthetic ablation**: all invented policy fixtures. Ten prohibited, six permitted; four control configurations. See source and case-by-case CSV. The numerators are deterministic and chosen to illustrate which channels a control checks, not to estimate privacy in any deployment.

## Strengths of the source literature

1. **A data-centric taxonomy is actionable.** It provides a way to place controls at concrete execution boundaries rather than only optimize prompts.
2. **Intermediate-channel evidence directly tests the motivation.** AgentLeak observes channels missed by final-answer inspection.
3. **The broader surveys help connect architecture, evaluation, and memory.** This avoids treating one paper as a complete engineering standard.
4. **Covers both confidentiality and purpose.** An authorized read may still be unauthorized onward sharing or retention.

## Limits and research gaps

1. Primary paper is a working draft, not peer-reviewed; cross-surface control applicability is a *qualitative* synthesis.
2. Published benchmark designs vary; results should not be compared as one leaderboard without aligned threat models and denominators.
3. Proposed policy engine is a reference design, not something evaluated in the paper or implemented here.
4. No LLM/model evaluation is performed by this package. The deterministic ablation has no human annotation or natural-language transformations.
5. End-to-end data provenance is hard: derived/inferred facts, embeddings, summaries and repeated queries can evade simple labels.
6. Defense measures must report **utility preserved** and **cost**, otherwise refusals can appear deceptively strong.

## Figure provenance

| Figure | Description | Provenance |
| --- | --- | --- |
| 01 | Six agent data surfaces | Newly drawn conceptual schematic; taxonomy from [1] |
| 02 | Three-axis taxonomy | Newly drawn original reading guide; categories from [1] |
| 03 | Defense control coverage | Newly rendered qualitative comparison based on [1]; dots are **not** measured precision/accuracy |
| 04 | AgentLeak findings | Newly constructed chart of reported values from [5]; careful about overlapping categories |
| 05 | Benchmark gap map | Newly constructed interpretation of source benchmark coverage in [1]; not model leaderboard |
| 06 | Synthetic ablation | Original synthetic results retained in `experiment/ablation_results.csv`; no external empirical evidence claimed |
| 07 | Privacy-aware architecture | Original proposed design informed by [1–4], not tested architecture |

## Critical position

The most consequential agent risk is not the single visible response but the composition of authorized and unauthorized data flows. In an implementation, a separate policy decision point should bind **principal, task purpose, data classification, recipient, and retention** at every tool/memory/peer transition. Evaluate it with full traces, false blocks, task success, runtime/cost and repeated-query inference. These recommendations are this author's synthesis, not conclusions proved by a controlled study.
