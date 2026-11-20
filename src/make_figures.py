from pathlib import Path
import json, math
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle
from matplotlib.colors import ListedColormap
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'figures'
OUT.mkdir(exist_ok=True)
NAVY='#132A41'; BLUE='#236DD6'; TEAL='#058C8C'; SKY='#E9F2FE'; MINT='#E5F5F2'; RED='#C04D5D'; PAPER='#FAFBFE'; SLATE='#3B4D61'; GRAY='#77869B'
plt.rcParams.update({'font.family':'DejaVu Sans','savefig.facecolor':'white','font.size':13,'axes.titlesize':20})

def savefig(name,fig):
 fig.savefig(OUT/name,dpi=190,bbox_inches='tight',pad_inches=0.26,facecolor='white'); plt.close(fig)

def box(ax,x,y,w,h,title,desc='',fc=SKY,ec=BLUE,title_size=12):
 p=FancyBboxPatch((x,y),w,h,boxstyle='round,pad=0.012,rounding_size=.02',linewidth=1.6,edgecolor=ec,facecolor=fc)
 ax.add_patch(p)
 ax.text(x+w/2,y+h*.62,title,ha='center',va='center',fontsize=title_size,fontweight='bold',color=NAVY)
 if desc: ax.text(x+w/2,y+h*.29,desc,ha='center',va='center',fontsize=9.5,color=SLATE)

def arrow(ax,start,end,col=TEAL):
 ax.add_patch(FancyArrowPatch(start,end,arrowstyle='-|>',mutation_scale=14,linewidth=2,color=col))

# 01 six surfaces
fig,ax=plt.subplots(figsize=(14,6.4));ax.set_xlim(0,1);ax.set_ylim(0,1);ax.axis('off')
ax.text(.04,.96,'An agent is a chain of data surfaces',fontsize=24,fontweight='bold',color=NAVY,va='top')
ax.text(.04,.88,'Original interpretation of Lahjouji & Colaco (2026), Section 3',fontsize=11,color=GRAY)
box(ax,.365,.38,.27,.23,'LLM AGENT','plan  •  act  •  observe',fc=MINT,ec=TEAL,title_size=18)
parts=[(.035,.64,'Database / warehouse','rows, queries, schema'),(.365,.68,'Documents / files','records, fields'),(.695,.64,'RAG / vector store','passages, embeddings'),(.035,.13,'External tools / APIs','arguments, responses'),(.365,.07,'Persistent memory','cross-session facts'),(.695,.13,'Other agents','messages, handoffs')]
for x,y,t,d in parts:
 box(ax,x,y,.27,.19,t,d,fc=SKY,ec=BLUE,title_size=11.5)
 centers=[(.305,.71),(.50,.68),(.695,.71),(.305,.21),(.50,.26),(.695,.21)]
 ends=[(.395,.51),(.50,.61),(.605,.51),(.395,.45),(.50,.38),(.605,.45)]
 for_a=None
for a,b in zip(centers,ends): arrow(ax,a,b)
ax.text(.5,.015,'Privacy must be checked on every edge, not only at the final answer.',ha='center',fontsize=12,color=RED,fontweight='bold')
savefig('01-six-data-surfaces.png',fig)

# 02 matrix taxonomy
fig,ax=plt.subplots(figsize=(14,6.7));ax.set_xlim(0,1);ax.set_ylim(0,1);ax.axis('off')
ax.text(.03,.96,'Three complementary taxonomies',fontweight='bold',fontsize=24,color=NAVY,va='top')
headers=[('SURFACE','Where does data live?',BLUE,['SQL / warehouses','Files & dataframes','RAG and vector indexes','Tools / external APIs','Long-term memory','Inter-agent messages']),('OUTCOME','What is disclosed?',RED,['Direct answer','Intermediate artifacts','Schema or metadata','Inference / aggregation','Cross-surface composition','Policy / consent violation']),('CONTROL','Where to enforce?',TEAL,['Least-privilege access','Information-flow control','Runtime policy gates','Privacy transformations','Contextual integrity','Auditing + provenance'])]
for i,(name,sub,color,items) in enumerate(headers):
 x=.03+i*.325
 ax.add_patch(FancyBboxPatch((x,.08),.295,.76,boxstyle='round,pad=.012',facecolor='#F2F6FA',edgecolor='#D5E0EA'))
 ax.add_patch(FancyBboxPatch((x,.72),.295,.12,boxstyle='round,pad=.005',facecolor=color,edgecolor=color))
 ax.text(x+.147,.782,name,ha='center',va='center',fontsize=17,fontweight='bold',color='white')
 ax.text(x+.147,.69,sub,ha='center',fontsize=11,style='italic',color=SLATE)
 for j,st in enumerate(items):
  yy=.595-j*.087
  ax.add_patch(Circle((x+.03,yy),.008,color=color))
  ax.text(x+.052,yy,st,ha='left',va='center',fontsize=11.3,color=NAVY)
ax.text(.50,.02,'A vector (e.g., injection) triggers an outcome; it is not itself the outcome.',ha='center',fontsize=11,color=GRAY)
savefig('02-taxonomy.png',fig)

# 03 control matrix
mechanisms=['Access control','Information-flow control','Runtime governance','Privacy transforms','Differential / formal privacy','Confidential retrieval','Contextual reasoning','Human oversight','Auditing / provenance']
labels=['Direct output','Intermediate','Metadata','Inference','Composition','Policy / consent']
raw=[['P','p','P','p','-','P'],['P','P','p','p','P','p'],['p','P','-','-','p','P'],['P','p','p','P','p','p'],['-','-','-','P','p','-'],['-','P','p','P','-','-'],['P','-','-','p','p','P'],['P','p','-','p','p','P'],['p','P','p','p','p','P']]
data=np.array([[{'P':2,'p':1,'-':0}[c] for c in row] for row in raw])
fig,ax=plt.subplots(figsize=(13,6.7));ax.imshow(data,cmap=ListedColormap(['#F0F3F7','#B7D9E6','#0A8A8B']),vmin=0,vmax=2,aspect='auto')
ax.set_xticks(range(6),labels,fontsize=11);ax.set_yticks(range(9),mechanisms,fontsize=11);ax.tick_params(length=0)
for i in range(len(mechanisms)):
 for j in range(len(labels)):ax.text(j,i,['—','◐','●'][data[i,j]],ha='center',va='center',fontsize=15,color='white' if data[i,j]==2 else NAVY)
ax.set_title('Which privacy controls cover which leak types?',fontweight='bold',pad=21,color=NAVY)
ax.text(.5,-.13,'● primary   ◐ partial   — not covered   |   source: Lahjouji & Colaco (2026), Table 5',transform=ax.transAxes,ha='center',fontsize=10,color=GRAY)
fig.tight_layout();savefig('03-control-coverage.png',fig)

# 04 AgentLeak measurements from IEEE Access paper
names=['Inter-agent message leakage','Leakage in final answer','Clean answer + internal leak']
vals=[68.8,27.2,41.7]
fig,ax=plt.subplots(figsize=(12,5.5));fig.patch.set_facecolor('white')
y=np.arange(3);bars=ax.barh(y,vals,color=[BLUE,TEAL,RED],height=.62)
ax.set_yticks(y,names,fontsize=12);ax.invert_yaxis();ax.set_xlim(0,84)
ax.set_xlabel('Share of validated traces (%)',color=SLATE);ax.set_title('A clean final answer is not a clean execution',fontweight='bold',color=NAVY,pad=20)
for b,v in zip(bars,vals):ax.text(v+1.3,b.get_y()+b.get_height()/2,f'{v:.1f}%',va='center',fontsize=14,fontweight='bold',color=NAVY)
for s in ('top','right','left'):ax.spines[s].set_visible(False)
ax.grid(axis='x',alpha=.16);ax.set_axisbelow(True)
fig.text(.05,.01,'AgentLeak (El Yagoubi et al., IEEE Access, June 2026), 4,979 validated traces. Categories overlap; do not sum.',fontsize=9,color=GRAY)
fig.tight_layout(rect=(0,.06,1,1));savefig('04-agentleak-findings.png',fig)

# 05 map benchmark gap
benches=['SecureSQL','RAG-MIA','Spill the Beans','AgentDojo','InjecAgent','ASB','MEXTRA','AgentLeak','MAGPIE','ConfAIde','PrivacyLens','AgentDAM','ST-WebAgentBench']
mult=[0,0,1,2,2,2,2,2,2,0,2,2,2]
policy=[1,0,0,0,0,1,0,1,1,1,1,1,2]
d=np.array([mult,policy]).T
fig,ax=plt.subplots(figsize=(10,6.9));ax.imshow(d,cmap=ListedColormap(['#F0F3F7','#B7D9E6','#0A8A8B']),vmin=0,vmax=2,aspect='auto')
ax.set_xticks(range(2),['Multi-step evaluation','Explicit privacy policy'],fontsize=12)
ax.set_yticks(range(13),benches,fontsize=10.5);ax.tick_params(length=0)
for i in range(len(benches)):
 for j in range(2):ax.text(j,i,['—','◐','●'][d[i,j]],ha='center',va='center',fontsize=14,color='white' if d[i,j]==2 else NAVY)
ax.set_title('Most benchmarks do not test policy across a full data-agent journey',fontsize=16,fontweight='bold',color=NAVY,pad=18)
fig.text(.12,.015,'Qualitative encoding of Table 6 in Lahjouji & Colaco (2026); no cross-surface end-to-end benchmark in that review.',fontsize=9,color=GRAY)
fig.tight_layout(rect=(0,.05,1,1));savefig('05-benchmark-gap.png',fig)

# 06 synthetic ablation
r=json.loads((ROOT/'experiment'/'ablation_results.json').read_text())['results']
labels2=['No control','Final-answer filter','Source-only scope','End-to-end flow policy']
block=[x['privacy_block_rate'] for x in r]; utility=[x['benign_utility_rate'] for x in r]
fig,ax=plt.subplots(figsize=(12.5,5.8));x=np.arange(4);w=.34
b1=ax.bar(x-w/2,block,w,label='Prohibited flows blocked (%)',color=BLUE);b2=ax.bar(x+w/2,utility,w,label='Permitted flows retained (%)',color=TEAL)
ax.set_xticks(x,labels2,fontsize=11);ax.set_ylim(0,112);ax.set_ylabel('Rate (%)');ax.set_title('Toy ablation: controls must protect intermediate flows',fontsize=19,fontweight='bold',color=NAVY,pad=21)
for b in b1+b2:
 ax.text(b.get_x()+b.get_width()/2,b.get_height()+2,f'{b.get_height():.0f}%',ha='center',va='bottom',fontsize=11,fontweight='bold',color=NAVY)
ax.legend(ncol=2,loc='upper left',frameon=False,fontsize=10);ax.spines[['top','right']].set_visible(False);ax.grid(axis='y',alpha=.16);ax.set_axisbelow(True)
fig.text(.04,.01,'Illustrative deterministic toy harness: 10 prohibited + 6 permitted synthetic flows; not an LLM experiment.',color=RED,fontsize=10)
fig.tight_layout(rect=(0,.06,1,1));savefig('06-synthetic-ablation.png',fig)

# 07 reference architecture
fig,ax=plt.subplots(figsize=(14,6.3));ax.set_xlim(0,1);ax.set_ylim(0,1);ax.axis('off')
ax.text(.03,.96,'A practical blueprint: policy outside the model',fontsize=23,fontweight='bold',color=NAVY,va='top')
steps=[(.035,'USER','request + identity'),(.28,'PLANNER','propose action'),(.53,'POLICY GATE','role + purpose + labels'),(.78,'EXECUTOR','scoped tool call')]
for i,(x,t,dsc) in enumerate(steps):
 box(ax,x,.60,.185,.20,t,dsc,fc=MINT if i==2 else SKY,ec=TEAL if i==2 else BLUE,title_size=12)
 if i<3:arrow(ax,(x+.188,.70),(steps[i+1][0]-.008,.70))
box(ax,.13,.18,.30,.19,'AUDIT / TRACE','who, what, where, why',fc='#F5F0FE',ec='#8B6AC8',title_size=12)
box(ax,.57,.18,.30,.19,'LABELLED MEMORY','retention + deletion rules',fc='#FDF3EE',ec=RED,title_size=12)
arrow(ax,(.623,.60),(.68,.37));arrow(ax,(.61,.60),(.28,.37))
ax.text(.50,.07,'Stop unauthorized flows before execution; log decisions; apply labels to stored state.',ha='center',fontsize=12,color=SLATE)
savefig('07-policy-architecture.png',fig)
print('Created', len(list(OUT.glob('*.png'))),'figures')
