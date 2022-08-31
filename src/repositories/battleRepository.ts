import { connection } from '../database';

async function saveFighter(fighter: string) {
  const fighterExists: any = await connection.query(
    `
      SELECT * FROM fighters
      WHERE username = $1
    `,
    [fighter]
  );

  if (fighterExists.length > 0) {
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

async function saveFight(fight: any) {
  if (fight.draw) {
    await connection.query(
      `
        UPDATE fighters SET draws = draws + 1
        WHERE username = $1 OR username = $2
      `,
      [fight.user1, fight.user2]
    );
    return;
  }
}

export { saveFighter };
