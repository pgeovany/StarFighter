import axios from 'axios';
import * as battleRepository from '../repositories/battleRepository';

async function battle(user1: string, user2: string) {
  await battleRepository.saveFighter(user1);
  await battleRepository.saveFighter(user2);

  const user1Count = await getUserStargazersCount(user1);
  const user2Count = await getUserStargazersCount(user2);

  if (user1Count === user2Count) {
    await battleRepository.saveFightRecord(user1, user2, true);
    return {
      winner: null,
      loser: null,
      draw: true,
    };
  } else if (user1Count > user2Count) {
    await battleRepository.saveFightRecord(user1, user2, false);
    return {
      winner: user1,
      loser: user2,
      draw: false,
    };
  } else {
    await battleRepository.saveFightRecord(user2, user1, false);
    return {
      winner: user2,
      loser: user1,
      draw: false,
    };
  }
}

async function getUsersInfo(user: string) {
  let userInfo: any;

  try {
    await axios
      .get(`http://api.github.com/users/${user}/repos`)
      .then(({ data }) => {
        userInfo = data;
      });
  } catch (error) {
    return null;
  }

  return userInfo;
}

async function getUserStargazersCount(user: string) {
  const userInfo = await getUsersInfo(user);
  if (!userInfo) {
    throw {
      type: 'user_not_found',
      message: 'You must provide a valid Github user!',
    };
  }
  let starCount = 0;
  userInfo.map((project: any) => (starCount += project.stargazers_count));
  return starCount;
}

export { battle };
