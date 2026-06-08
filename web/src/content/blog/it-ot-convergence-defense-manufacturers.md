Walk most defense machine shops and you find three networks with three owners who rarely sit in the same room. The front office runs IT: the enterprise resource planning (ERP) system, email, the file shares where Controlled Unclassified Information (CUI) quietly accumulates. The floor runs operational technology (OT): the programmable logic controllers (PLCs), the supervisory control and data acquisition (SCADA) layer, the machine controllers that turn a drawing into a part. The manufacturing execution system (MES) sits in between, claimed by both and owned by neither. That divide is where both your margin and your compliance break.

## Why are MES, ERP, and SCADA three compliance liabilities until they are one?

Separate MES, ERP, and SCADA environments are three distinct Cybersecurity Maturity Model Certification (CMMC) liabilities because each one holds or touches CUI under different controls, different access lists, and different owners. An assessor does not score your intentions. They score whether the controls that protect CUI are implemented and provable across every system the data crosses.

When the three systems are run as islands, each becomes its own audit exposure:

- **The ERP** holds contracts, drawings, and specifications that are frequently CUI, governed by IT policy that the floor never reads.
- **The MES** routes that same controlled data down to the work instruction at the machine, often with weaker access control than the ERP it pulls from.
- **The SCADA and PLC layer** was built for uptime and safety, not for confidentiality, and was often never designed to be on a network at all.

CMMC Level 2 requires implementing the 110 controls of NIST Special Publication (SP) 800-171, the standard for protecting CUI in nonfederal systems. Those controls assume you can name your boundary, control access into it, and log what happens inside it. Three disconnected systems with three owners cannot answer those three questions consistently, so the auditor finds three gaps instead of one defensible system.

> Convergence is not a software purchase. It is making the path your CUI travels visible, controlled, and provable from the contract in the ERP to the work instruction at the machine.

## Where exactly does the CUI cross the IT and OT boundary?

CUI crosses the IT and OT boundary at the moment a drawing or specification leaves the ERP and becomes a work instruction at the machine. That hand-off is the single most overlooked control point in a defense shop, and it is precisely where a careful assessor will look.

The crossing happens in ways that feel routine on the floor:

- A machinist exports a controlled drawing from the MES to a USB drive to load a program at the controller.
- A CAM file derived from a CUI specification lands on a shared floor PC with no access list.
- A SCADA historian logs process data tied to a controlled part, then syncs to a server that anyone in the office can reach.

Each of those is CUI moving from a system you treat as protected into a system you have historically treated as a machine, not a computer. Under DFARS 252.204-7012, the clause that obligates you to safeguard covered defense information, the protection requirement follows the data. It does not stop at the edge of the office network. For an International Traffic in Arms Regulations (ITAR) controlled item, the same crossing also carries export-control exposure, because a technical data file is reachable by anyone who can reach the system it sits on.

The fix is not to forbid the hand-off. Work has to flow from the contract to the cut. The fix is to architect the crossing so the data stays controlled while it moves.

## How do you secure the boundary without halting production?

You secure the IT and OT boundary by segmenting the networks and controlling the crossing point, not by locking the floor down so hard that parts stop shipping. The goal is a monitored gate between IT and OT, not a wall that work cannot pass through.

The practical sequence:

- **Map the data path first.** Before any tool is bought, document every place CUI moves between ERP, MES, and the machine layer. You cannot protect a boundary you have not drawn. This is the same discipline as value stream mapping, applied to data instead of material.
- **Segment, then bridge with control.** Put OT on its own network segment so a compromised office PC cannot reach a controller, and route the necessary CUI hand-offs through a controlled, logged conduit rather than a USB drive or an open share. Segmentation protects uptime as much as confidentiality, because it contains a problem before it reaches a machine.
- **Apply the 800-171 controls where the data is, not everywhere.** Scope a CUI enclave so the controls land on the systems that actually touch controlled data. This narrows the assessment surface and keeps the rest of the floor running normally.
- **Stage the work against production windows.** Network changes that touch live machines get scheduled the way you schedule a tooling change, around the production plan, with a rollback path. Production does not stop for compliance. Compliance gets installed into how production already runs.

I build the controls into the work itself, so the routine an operator follows is already the compliant routine. When the assessor walks in, they find the controls running, not a binder describing controls nobody uses.

## What is the digital thread, and why does converging it protect margin too?

The digital thread is the connected flow of data that follows a part from the contract through engineering, planning, the floor, and back into the financials. Converging IT and OT to build one secure thread does more than satisfy an auditor. It surfaces the margin that lives in the gaps between the three systems.

When MES, ERP, and SCADA are islands, the cost of that disconnection is invisible:

- Rework gets fixed at the machine and never makes it back into the ERP, so you keep quoting the job at a price that loses money.
- Scrap and downtime live in the SCADA historian and never reach the P&L, so the financial picture is cleaner than the floor.
- The undocumented problem solving that keeps parts moving, the Hidden Factory, is precisely the data that never crosses from OT into the systems leadership watches.

A converged thread closes those gaps. The same access-controlled conduit that protects CUI also carries floor reality up to the financials, so the constraint becomes visible and the margin trapped in rework becomes recoverable. The security architecture and the operational architecture are the same architecture. Built once, the secure digital thread is both the auditor's evidence and the owner's instrument panel.

## What does a defense manufacturer get wrong most often here?

The most common mistake is treating IT and OT convergence as an IT project, handed to the office, with the floor as an afterthought. That framing produces a security posture the machinists route around, because the people who move CUI every day were never in the room when the controls were designed.

The second mistake is buying the platform before mapping the path. A digital thread tool sold as the answer will faithfully connect whatever mess you point it at, including the broken process and the uncontrolled crossing. Clean, mapped, access-controlled data has to come first. The technology is the last step, not the first.

The third is scoping too wide. Trying to bring the entire shop to NIST SP 800-171 at once, instead of enclaving the systems that touch CUI, turns a manageable assessment into an open-ended one and stalls everything else. Define the boundary, then converge inside it.

## The bottom line

For a defense manufacturer, separate MES, ERP, and SCADA environments are three CMMC liabilities because CUI crosses between them under different controls and owners, most dangerously at the hand-off from the ERP to the machine. Converging them into one segmented, logged, access-controlled digital thread turns three audit exposures into a single defensible system, and the same architecture surfaces the rework and scrap that were starving your margin. Map the data path first, secure the crossing without walling off the floor, and build the controls into the work so the assessor finds them already running.
