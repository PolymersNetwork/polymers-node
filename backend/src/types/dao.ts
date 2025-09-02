/**
 * dao.ts
 * Types for DAO governance: proposals, voting, execution
 */

export interface DAOProposal {
  id: string;
  title: string;
  description?: string;
  votesFor: number;
  votesAgainst: number;
  executed: boolean;
  createdAt: number;
  executedAt?: number;
}

export interface DAOVote {
  proposalId: string;
  voterId: string;
  voteFor: boolean;
  timestamp: number;
}
