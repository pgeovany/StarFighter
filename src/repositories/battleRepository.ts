import { connection } from '../database';

async function saveFighter(fighter: string) {
  const { rows } = await connection.query(
    `
      SELECT * FROM fighters
      WHERE username = $1
    `,
    [fighter]
  );

  console.log();

  if (rows.length > 0) {
    return;
  }

  await connection.query(
    `
      INSERT INTO fighters (username, wins, losses, draws)
      VALUES ($1, 0, 0, 0);
    `,
    [fighter]
  );
}

async function saveFightRecord(winner: string, loser: string, draw: boolean) {
  if (draw) {
    await connection.query(
      `
        UPDATE fighters SET draws = draws + 1
        WHERE username = $1 OR username = $2
      `,
      [winner, loser]
    );
    return;
  }

  await connection.query(
    `
      UPDATE fighters SET wins = wins + 1
      WHERE username = $1
    `,
    [winner]
  );

  await connection.query(
    `
      UPDATE fighters SET losses = losses + 1
      WHERE username = $1
    `,
    [loser]
  );
}

export { saveFighter, saveFightRecord };
