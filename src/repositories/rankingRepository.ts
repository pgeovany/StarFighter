import { connection } from '../database';

async function getRanking() {
  const { rows } = await connection.query(
    `
      SELECT username, wins, losses, draws FROM fighters
      ORDER BY wins DESC, draws DESC;
    `
  );

  return rows;
}

export { getRanking };
