# Progress Ledger Learning Path

This is the learning map for understanding what Progress Ledger is becoming.

The simple version:

Progress Ledger is a proof system for work. People and AI agents submit work,
reviewers verify the work, receipts record what was checked, and higher-level
milestones or passports summarize trustworthy history.

## The Mental Model

1. Receipt
   - A record that says: this artifact was checked by this method.
   - Example: a PR, proof, eval, or compute output.

2. Verifier
   - A person, maintainer, reviewer, or eventually agent that checks a bounded
     claim.
   - The verifier does not say "this person is good at everything."
   - The verifier says "this specific artifact passed this specific check."

3. Milestone
   - A rare mark unlocked only after enough accepted receipts.
   - It should not promise revenue, governance, or investment value.

4. Agent passport
   - A shareable proof profile for an AI agent or contributor.
   - It shows receipts, disputes, verifier history, and milestones.

5. Multichain witness
   - One canonical receipt hash can be mirrored on multiple chains.
   - The chain is a witness, not the whole truth.

## Week 1: Understand What You Are Building

Goal: be able to explain Progress Ledger in 60 seconds.

Study:
- What is an AI agent?
- What is a cryptographic hash?
- What is an attestation?
- Why does verification matter more than claims?
- What is soulbound reputation?

Build understanding:
- Read the existing docs in this repo.
- Explain the project out loud once per day.
- Keep the explanation simple: "Receipts for verified work."

## Week 2: Understand Crypto Rails

Goal: understand why agents, payments, and receipts belong together.

Study:
- Wallets as identity
- Stablecoin payments
- Tokenized claims
- Soulbound tokens
- EVM vs Solana basics
- Why x402 matters for agent payments

Build understanding:
- Learn what can go on-chain and what should stay off-chain.
- Keep repeating: the receipt hash can go on-chain; the full proof pack can
  live off-chain and stay inspectable.

## Week 3: Understand Verification

Goal: understand why the verifier graph is the moat.

Study:
- Code review
- Mathematical proof verification
- Reproducible evals
- Reviewer reputation
- Dispute handling
- Failure-credit receipts

Build understanding:
- A failed attempt can still be useful if the artifact and method are clear.
- A reviewer becomes trusted when their checks keep holding up over time.

## Week 4: Understand the Product

Goal: know what should be built next.

Priority product surfaces:

1. Agent proof passport
2. Receipt detail page
3. Bounty detail page
4. Verifier profile
5. Dispute page
6. Milestone eligibility checker
7. Multichain receipt mirror

## Best Listening

AI builders:
- Latent Space: The AI Engineer Podcast
- No Priors
- Dwarkesh Podcast

Crypto and agents:
- Bankless AI Agents
- The Delphi Podcast
- Empire
- Unchained
- Lightspeed

Good search terms:
- "AI agents crypto"
- "agent payments"
- "x402"
- "soulbound tokens"
- "attestations"
- "Ethereum Attestation Service"
- "Solana compressed NFTs"
- "verifiable credentials"
- "reputation systems"

## How To Learn Without Getting Overwhelmed

Use this loop:

1. Listen to one thing.
2. Write three notes.
3. Ask: "How does this change Progress Ledger?"
4. Build one small piece.
5. Tweet one honest update.

Do not try to become an expert in everything at once.

Become dangerous in this order:

1. Explain the idea clearly.
2. Understand receipts.
3. Understand agents.
4. Understand verification.
5. Understand token mechanics.
6. Understand legal risk.
7. Understand go-to-market.

## The One-Sentence North Star

Before anyone trusts an agent, funds a bounty, or believes a claim, they should
be able to inspect the receipts.
