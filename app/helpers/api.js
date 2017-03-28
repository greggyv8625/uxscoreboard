import axios from 'axios'
// import StattleshipAPI from 'node-stattleship'
// import { token } from 'config/stattleship'
const CORS = 'https://cors-anywhere.herokuapp.com/'

const dateObject = (dt) => {
  const yyyy = dt.slice(0, 4)
  const mm = dt.slice(4, 6)
  const dd = dt.slice(6, dt.length)
  return { yyyy, mm, dd }
}

// axios request - mlb scores
export const getMlbScores = (dt) => {
  const { yyyy, mm, dd } = dateObject(dt)
  const url = `${CORS}http://gd2.mlb.com/components/game/mlb/year_${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
  return axios.get(url)
    .then(currentScores => currentScores.data)
    .catch(currentScores => currentScores.status)
}

// axios request - nba scores
export function getNbaScores(dt) {
  const url = `${CORS}http://data.nba.com/data/5s/json/cms/noseason/scoreboard/${dt}/games.json`
  const url2 = `${CORS}http://data.nba.net/data/10s/prod/v2/${dt}/scoreboard.json`
  return axios.all([axios.get(url), axios.get(url2)])
    .then(axios.spread((details, standings) => Object.assign({}, details.data, standings.data)))
    .catch(currentScores => currentScores.status)
}

// axios request - nba game details
export function getNbaGameDetails(dt,id) {
  const url = `${CORS}http://data.nba.com/data/10s/json/cms/noseason/game/${dt}/${id}/boxscore.json`
  return axios.get(url)
    .then(gameDetails => gameDetails.data)
    .catch(gameDetails => gameDetails.status)
}

// axios request - nfl scores
export const getNflScores = (dt) => {
  const { yyyy, mm, dd } = dateObject(dt)
  const url = `http://www.nfl.com/ajax/scorestrip?season=2016&seasonType=REG&week=1`
  return axios.get(url)
    .then(currentScores => currentScores.data)
    .catch(currentScores => currentScores.status)
}

// axios request - nhl scores
export const getNhlScores = (dt) => {
  const { yyyy, mm, dd } = dateObject(dt)
  const url = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${yyyy}-${mm}-${dd}&endDate=${yyyy}-${mm}-${dd}&expand=schedule.teams,schedule.linescore,schedule.scoringplays,schedule.game.seriesSummary`
  return axios.get(url)
    .then(currentScores => currentScores.data)
    .catch(currentScores => currentScores.status)
}
