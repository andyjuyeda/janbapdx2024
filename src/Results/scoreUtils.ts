// Define an interface for a participant
interface Participant {
  Lane: number;
  Name: string;
  Average: number;
  Division: number;
  Score: number[];
  Event: string;
  _id: string;
}

// Function to calculate the total score for a participant
const calculateTotalScore = (scores: number[]): number => {
  return scores.reduce((acc, cur) => acc + cur, 0);
};

// Function to sort participants by their total scores in descending order
const sortParticipantsByScore = (
  participants: Participant[],
  eventName: string
): Participant[] => {
  if (eventName.toLowerCase().includes("doubles")) {
    const combinedScores: { index: number; combinedScore: number }[] =
      participants
        .map((_, index, arr) => {
          if (index % 2 === 0) {
            // Pair logic: Every two participants are considered a pair
            const pairScore =
              calculateTotalScore(arr[index].Score) +
              (arr[index + 1] ? calculateTotalScore(arr[index + 1].Score) : 0);
            return { index, combinedScore: pairScore };
          } else {
            return null;
          }
        })
        .filter(
          (el): el is { index: number; combinedScore: number } => el !== null
        );

    combinedScores.sort((a, b) => b.combinedScore - a.combinedScore);

    const sortedParticipants: Participant[] = [];
    combinedScores.forEach((el) => {
      sortedParticipants.push(participants[el.index]);
      if (participants[el.index + 1]) {
        sortedParticipants.push(participants[el.index + 1]);
      }
    });

    return sortedParticipants;
  } else if (eventName.toLowerCase().includes("team")) {
    // Team logic: Groups of 5 participants are considered a team
    const combinedScores: { index: number; combinedScore: number }[] =
      participants
        .map((_, index, arr) => {
          if (index % 5 === 0) {
            const teamScore = arr
              .slice(index, index + 5)
              .reduce((acc, cur) => acc + calculateTotalScore(cur.Score), 0);
            return { index, combinedScore: teamScore };
          } else {
            return null;
          }
        })
        .filter(
          (el): el is { index: number; combinedScore: number } => el !== null
        );

    combinedScores.sort((a, b) => b.combinedScore - a.combinedScore);

    const sortedParticipants: Participant[] = [];
    combinedScores.forEach((el) => {
      sortedParticipants.push(
        ...participants.slice(el.index, el.index + 5).filter((p) => p)
      );
    });

    return sortedParticipants;
  } else {
    // Default logic for individual participants
    return participants.sort((a, b) => {
      const totalScoreA = calculateTotalScore(a.Score);
      const totalScoreB = calculateTotalScore(b.Score);
      return totalScoreB - totalScoreA;
    });
  }
};

function chunkArray(array: Participant[], chunkSize: number): Participant[][] {
  const chunks: Participant[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export { calculateTotalScore, sortParticipantsByScore, chunkArray };
export type { Participant };
