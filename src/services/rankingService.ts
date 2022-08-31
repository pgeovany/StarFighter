import * as rankingRepository from '../repositories/rankingRepository';

async function getRanking() {
  const fighters = await rankingRepository.getRanking();
  return { fighters };
}

export { getRanking };
