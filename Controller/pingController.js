/* 
Request:
Route: /api/ping
Method: GET
Response:
Response body (JSON): {
"success": true }
Response status code: 200
*/

const getPing = (req, res, next) => {
  let msg = { success: true };
  res.status(200).json({
    ...msg,
  });
};

module.exports = {
  getPing,
};
