A single number you typed into a federal database can become the basis of a fraud case against your company. That number is your Supplier Performance Risk System self-assessment score, and if it is wrong in the government's favor, the law that governs it is not a cybersecurity regulation. It is the False Claims Act.

Most owners treat the SPRS score as an IT housekeeping task. It is a representation to the United States government, and the gap between those two readings is where the exposure lives.

## What is an SPRS score and where does it come from?

The Supplier Performance Risk System (SPRS) is the Department of Defense database that holds your self-assessed cybersecurity score. The score is a single number on a scale that tops out at 110, calculated against the 110 security requirements in NIST Special Publication 800-171, the federal standard for protecting Controlled Unclassified Information (CUI) on a contractor's systems.

The obligation to post that score is not optional, and it is not new. Two DFARS clauses created it:

- **DFARS 252.204-7019** requires you to have a current NIST SP 800-171 assessment on file in SPRS, performed within the prior three years, before you can be awarded a covered contract.
- **DFARS 252.204-7020** requires you to provide the government access to your systems and to post the Basic Assessment result, the self-scored number, in SPRS.

The methodology is the DoD Assessment Methodology. Every one of the 110 controls carries a point value. You start at 110 and subtract the weighted value of each control you have not fully implemented. A perfect score means all 110 controls are in place. A negative score is common and honest for a shop that has not started, because some single controls subtract five points each.

> The score is not a grade you give yourself. It is an arithmetic result of which controls are actually implemented on the day you assess.

## How does a wrong SPRS score become a False Claims Act problem?

The moment you post a score to win or keep a federal contract, you have made a representation to the government, and an inflated one can become liability under the False Claims Act (31 U.S.C. §§ 3729-3733). The False Claims Act imposes liability on anyone who knowingly submits a false claim for payment, or who uses a false record or statement material to a false claim. Cybersecurity attestations sit squarely inside that language.

The mechanism is what compliance lawyers call implied false certification. When you accept and perform a contract that requires DFARS 252.204-7012 safeguarding and a posted SPRS score, every invoice you submit carries an implied representation that you met the conditions of payment. If you knew your true score was 40 and you posted 95 to clear a prime's threshold, the invoices that followed can be treated as false claims.

"Knowingly" under the statute is broad. It covers actual knowledge, deliberate ignorance, and reckless disregard for the truth. You do not have to intend fraud. A score posted by someone who never verified whether the controls were real can meet the reckless-disregard standard.

The penalties are not symbolic. The False Claims Act provides for treble damages, three times the government's loss, plus a per-claim civil penalty, and each invoice can count as a separate claim.

## Who actually brings these cases?

Two parties can pursue an inaccurate SPRS score: the Department of Justice directly, and private whistleblowers. The DOJ launched its Civil Cyber-Fraud Initiative to use the False Claims Act against contractors who knowingly misrepresent their cybersecurity practices or knowingly fail to monitor and report incidents. Cybersecurity attestations are the explicit target of that initiative.

The second path is the one owners underestimate. The False Claims Act includes a qui tam provision that lets a private citizen, a relator, file suit on the government's behalf and share in any recovery. In practice the relator is often an insider: a former IT administrator, a departed compliance manager, an engineer who watched the score get inflated and kept the emails. The person who knows your real score is the person with standing to file against you and a financial incentive to do it.

This is why the SPRS score is a people problem as much as a technical one. The score lives in a federal system, but the knowledge of whether it is honest lives with everyone who touched your environment.

## How CMMC raises the stakes in 2026

CMMC turns the honor-system score into an audited one, which removes the room an inflated number used to hide in. The Cybersecurity Maturity Model Certification program, finalized by the DoD under 32 CFR, begins its mandatory phase on November 10, 2026, when C3PAO Level 2 certification starts appearing as a condition in DoD contracts. DFARS 252.204-7021 is the clause that flows the CMMC requirement into contracts and onto subcontractors.

A Level 2 certification assessment is performed by a third party, a Certified Third-Party Assessment Organization. That assessor will look at the same 110 NIST SP 800-171 controls your SPRS score claims to reflect. If your posted score says 100 and the assessor finds the true implementation is 55, you have a documented record of a representation that does not match reality, created by an independent party. That is the kind of evidence a qui tam relator or the DOJ builds a case on.

The honest reading: CMMC does not create the False Claims Act exposure. It exposes the exposure that was always there in an inflated self-assessment.

## How do I score honestly and protect myself?

You protect yourself by scoring the controls as they actually are today and remediating the gaps through a documented plan, not by inflating the number to clear a prime's threshold. The defensible posture has four parts.

- **Assess against the real environment.** Walk each of the 110 controls and score it on whether it is implemented now, not whether you intend to implement it. Document the basis for each deduction so the score is reconstructable.
- **Write a System Security Plan (SSP).** NIST SP 800-171 requires a written SSP describing how each control is met. An accurate score with a real SSP behind it is the opposite of reckless disregard.
- **Use a POA&M, not a fiction.** Open controls go into a Plan of Action and Milestones (POA&M), a tracked list of gaps with owners and target dates. A POA&M is a recognized, legitimate instrument. It lets you post a lower-but-true score and show the government a credible path to closing the gap. A POA&M is honest where an inflated score is fraud.
- **Date it and refresh it.** SPRS scores carry a date. A stale score performed three years ago against an environment that has since changed is its own false-affirmation risk. Re-assess when your systems change.

The number that survives scrutiny is the one you can defend line by line when an assessor, the DOJ, or a former employee asks how you got it.

## The bottom line

Your SPRS score is a representation to the federal government, and a knowingly inflated one converts a cybersecurity gap into False Claims Act liability that the DOJ's Civil Cyber-Fraud Initiative and private whistleblowers can pursue. The defense is not a higher number. It is an accurate score, a written System Security Plan, and a POA&M that shows real progress on the controls you have not finished. Score it the way a buyer scores a part: on what is actually there, documented well enough to defend.
