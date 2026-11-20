# Your AI Agent Can Give a Clean Answer and Still Leak Your Data

**Research short story | CMPE 297, Fall 2026 | Individual assignment**  
**Author:** Arshan Bhanage  
**Survey date:** June 25, 2026 | **Assembled:** November 19, 2026  
**Public GitHub repository:** <https://github.com/ArshanBhanage/Special-Topics-Short-Story>  
**Submission package:** article, deck, figures, experiment results, and research notes.

> **Central question:** Can an LLM agent disclose private information even when its final answer contains nothing sensitive? **Yes.** The safety of an agent depends on the full sequence of data movements through tools, retrieval, storage, and other agents—not the final answer alone.

![Clean Answer. Hidden Leak. — privacy in tool-using LLM agents](figures/00-cover.png)

| Article | Deck | Experiment | Video |
| --- | --- | --- | --- |
| Published | 22 slides complete | Synthetic results included | Recording still required |

## Read and view

| Deliverable | File or publication destination | Status |
| --- | --- | --- |
| **Original Medium-style article (3,255 words)** | [Markdown source](article/medium-article.md) · [self-contained HTML](article/medium-article-standalone.html) · [8-page PDF proof](article/Medium_Article_Proof.pdf) | **Local article files included** |
| Medium live article URL | [Published Medium story](https://medium.com/@bhanagearshan/your-ai-agent-can-give-a-clean-answer-and-still-leak-your-data-36e49baa2978) | **Published** |
| **Presentation (22 slides)** | [Editable PowerPoint](slides/Agent_Privacy_Short_Story.pptx) · [Slides/PDF](slides/Agent_Privacy_Short_Story.pdf) · [slide preview](slides/contact-sheet.png) | **Prepared** |
| Published presentation PDF | [Scribd link](https://www.scribd.com/document/1098754475/Agent-Privacy-Short-Story-pdf) | **Published** |
| YouTube link | **To be added after recording** | Pending author video |
| **Original figures (7)** | [`figures/`](figures/) | Included |
| **Synthetic experiment results** | [aggregate CSV](experiment/ablation_results.csv) · [all case decisions](experiment/scenario_decisions.csv) | Included and executed |
| Research provenance | [Source and evidence audit](research/EVIDENCE_AND_CRITIQUE.md) · [references](research/references.bib) | Included |
| Rubric and publication checks | [rubric crosswalk](research/RUBRIC_CROSSWALK.md) · [publication instructions](publishing/PUBLISHING_AND_SUBMISSION.md) | Included |
| Professor's course spreadsheet | [Fall 2026 CMPE 297 selections](https://docs.google.com/spreadsheets/d/13YnPKykntSONmfqkHyh94d7KsIvjdhrkblqKg8yLTFM/edit#gid=141293072) · row **19** | Row 19 is marked **approved** and links to this repository; the paper field links to the primary survey |

**Publication note:** the presentation PDF is published on Scribd and the article is published on Medium. This submission uses Scribd instead of SlideShare. The >=15-minute YouTube video remains to be recorded and uploaded.

## Paper selection

**Primary survey (published within the last six months)**  
Nada Lahjouji and Ashwin Gerard Colaco, *Agents That Know Too Much: A Data-Centric Survey of Privacy in LLM Agents*, arXiv:2606.26627 (June 25, 2026). [arXiv abstract](https://arxiv.org/abs/2606.26627) · [full text](https://arxiv.org/html/2606.26627).

This source is an **arXiv working draft, not a peer-reviewed conference paper**, but the topic is marked approved in the course spreadsheet. The paper contributes conceptual taxonomies and qualitative benchmark coverage, **not** a model leaderboard with numeric accuracy rankings. We therefore discuss leading representative techniques and independently published empirical evidence without fabricating a ranked leaderboard.

**Recent complementary surveys:**

- **Aug 2026:** Bajoria et al., *From Language Models to Agentic AI: A Survey of Autonomous, Action-Enabled, and Collaborative LLM Agents*, *Cognitive Computation*. [DOI](https://doi.org/10.1007/s12559-026-10619-1).
- **Sep 2026:** Nageshwaran et al., *Large language model agent evaluation and benchmarking*, *Artificial Intelligence Review*. [DOI](https://doi.org/10.1007/s10462-026-11678-4).
- **Oct 2026:** Han et al., *Learning to Remember: Advances in Memory Mechanisms for Large Language Models*, arXiv:2610.35089. [arXiv](https://arxiv.org/abs/2610.35089).

**Empirical and benchmark context:** El Yagoubi et al., *AgentLeak*, *IEEE Access* June 2026, [DOI](https://doi.org/10.1109/ACCESS.2026.3704541); Debenedetti et al., *AgentDojo*, NeurIPS 2024, [paper](https://proceedings.neurips.cc/paper_files/paper/2024/hash/97091a5177d8dc64b1da8bf3e1f6fb54-Abstract-Datasets_and_Benchmarks_Track.html).

## Research in one minute

The anchor survey organizes agent privacy along **three axes**: (1) **six data surfaces**—DB/warehouse, files, RAG/vector stores, tools/APIs, memory, and agent-to-agent communication; (2) **six privacy disclosure outcomes**—direct output, intermediate execution, metadata, inference/aggregation, composition, and purpose/consent misuse; (3) **nine governance families**—access control, information-flow control, transformations, formal privacy, confidential retrieval/computation, runtime policy gates, contextual/situated reasoning, approval loops, and audit/provenance.

The external **AgentLeak** paper reports 68.8% leakage occurrence in inter-agent messages versus 27.2% in final outputs and 41.7% clean finals with an internal disclosure *in its tested trace corpus*. These categories overlap; they must **not** be summed or generalized to all agents. The paper's statistics are **not** our experiment.

A small included **synthetic policy unit test** uses 16 entirely invented cases (10 disallowed / 6 allowed). Its expected outcome is a structural illustration: answer-only filtering cannot block a leak on an earlier tool or memory channel. The 100%-blocked score for one policy configuration does **not** imply perfect security, model performance, or leaderboard dominance.

## Figures / architecture

| Figure | What it explains |
| --- | --- |
| [01](figures/01-six-data-surfaces.png) | Six places sensitive agent data lives/moves |
| [02](figures/02-taxonomy.png) | Surface × disclosure outcome × governance view |
| [03](figures/03-control-coverage.png) | Qualitative defense coverage (adapted from survey, **not measured ranking**) |
| [04](figures/04-agentleak-findings.png) | Real published leakage rates with non-additive categories |
| [05](figures/05-benchmark-gap.png) | Benchmark surface/policy coverage, not a leaderboard |
| [06](figures/06-synthetic-ablation.png) | Included toy policy ablation; synthetic by construction |
| [07](figures/07-policy-architecture.png) | Proposed policy-gated agent system, **not empirically validated** |

All figures are original compositions/reconstructions, not screenshots of the papers. Full citations and provenance are in the article and research audit.

## Synthetic experiment results

The `experiment/` directory contains aggregate results and case-level decisions for 16 invented policy fixtures. These deterministic results illustrate policy coverage; they do not measure a live LLM.

## Suggested presentation flow (22 slides, ~15:23)

Motivation → primary survey and paper dates → six surfaces → six outcomes → nine defenses → reference implementation → independently reported AgentLeak results → benchmark gaps and evaluation metrics → case-level ablation → memory governance → future research challenge → references.


## Publish and submit

1. Read [`publishing/PUBLISHING_AND_SUBMISSION.md`](publishing/PUBLISHING_AND_SUBMISSION.md) for exact GitHub, Medium, Scribd, and YouTube steps.
2. Ensure the target GitHub repository exists and is **public**, then upload **the contents of this directory to the repository root**. Do not accidentally nest an extra `agent-privacy-short-story/` directory unless that is the intended assignment directory link.
3. Publish the article **as a new Medium post** (not an existing Medium article) using the original draft and figure uploads; paste the *actual* final Medium URL above.
4. The finished presentation PDF is published on Scribd at the URL above.
5. Record the narrated slides and upload a **video of 15 minutes or longer** to YouTube; paste its URL above and add the recording to the repository if GitHub file size permits. For larger videos, use Git LFS or point GitHub to the YouTube video rather than trying to commit a >100 MB blob.
6. Verify the course sheet `2026 short story` row 19 references the **public** GitHub repository. The row is currently marked approved and the paper cell links to the primary survey.
7. Open the repository as a logged-out visitor, click every link, and confirm access before submitting the exact public GitHub directory URL.

**Status:** The public repository, approved topic, article/deck/figures, experiment results, Scribd presentation, and Medium publication are complete. The >=15-minute video remains outstanding. See [rubric crosswalk](research/RUBRIC_CROSSWALK.md).

## Integrity and reproducibility

- Figures and writing are newly created, with credit to the surveyed authors and empirical sources.
- Survey taxonomy tables are **qualitative**; no invented model leaderboard numbers, ablation claims, or paper-specific training runs.
- Published rates and denominators are attributed to their original sources, not to this project.
- The synthetic case decisions are included in the experiment CSV. Nothing has been sent to a live LLM or production agent.
- The proposed architecture is an engineering synthesis, not a validated contribution from the primary authors.

**License:** Original prose and figures for coursework; external research retains its authors' rights. Cite the original articles when reusing their findings.
