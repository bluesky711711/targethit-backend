//Dependencies - Express 4.x and the MySQL Connection
const API_KEY = "ATHA_API_KEY_1.0";
var app_address = '0x3a9a6720B687a4F2Fc8e2d82a0B896C505340f62';
var app_private_key = '6749694b58b2c38fd900b6b71f9d45f5da2c8db42479dd57089b5b69d7643817';
var request = require('request');
var mysql       = require('mysql');
var credentials;
try{
		credentials = require('./credentials'); //CREATE THIS FILE YOURSELF
}catch(e){
		//heroku support
		credentials = require('../credentials_env');
}
connection  = mysql.createConnection(credentials);


var ATHA_CONTRACT_ADDRESS = '0x7eBb8e2e72891d08C495433075C64c223623E809';
const ATHA_ABI = [{"constant":false,"inputs":[{"name":"newSellPrice","type":"uint256"},{"name":"newBuyPrice","type":"uint256"}],
"name":"setPrices","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve",
"outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"token_amount","type":"uint256"}],
"name":"redeem","outputs":[{"name":"amount","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},
{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},
{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"target","type":"address"},
{"name":"mintedAmount","type":"uint256"}],"name":"mintToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[],"name":"buy","outputs":[{"name":"amount","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},
{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer",
"outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance",
"outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sell",
"outputs":[{"name":"revenue","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[],"name":"giveBlockReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},
{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},
{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];


var ATHA_CONTRACT_ADDRESS_TEST = '0x9e26750041f442f13748b181596a88E72338Cd90';
const ATHA_ABI_TEST = [{"constant":false,"inputs":[{"name":"newSellPrice","type":"uint256"},{"name":"newBuyPrice","type":"uint256"}],
"name":"setPrices","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],
"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"token_amount","type":"uint256"}],"name":"redeem","outputs":[{"name":"amount","type":"uint256"}],
"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},
{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"mintedAmount","type":"uint256"}],
"name":"mintToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[],"name":"buy","outputs":[{"name":"amount","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},
{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],
"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sell",
"outputs":[{"name":"revenue","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[],"name":"giveBlockReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},
{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},
{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];


function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!$%";

	for (var i = 0; i < 8; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function makeRedeemCode() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!$%";

	for (var i = 0; i < 12; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function send_tokens(to_address, to_amount, private_key){
	var ethers = require('ethers');
	var targetAddress = ethers.utils.getAddress(to_address);
	var amount = to_amount * ethers.utils.bigNumberify("1000000000000000000");
	myWallet = new ethers.Wallet('0x'+private_key);
	var provider = ethers.providers.getDefaultProvider();
	myWallet.provider = provider;
	tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, myWallet);
	tokenContract.estimate.transfer(targetAddress, amount).then(function(gasCost){
		tokenContract.transfer(targetAddress, amount, {
				gas: gasCost,
			//	gasLimit: 65000,
		}).then(function(txid) {
			console.log('success', txid);
		});
	});
}

function send_eth(to_address, to_amount, private_key){
	var ethers = require('ethers');
	var provider = ethers.providers.getDefaultProvider();
	var myWallet = new ethers.Wallet('0x'+private_key, provider);
	var targetAddress = ethers.utils.getAddress(to_address);
	amountWei = to_amount * ethers.utils.bigNumberify("1000000000000000000");
	provider.getGasPrice().then(function(gasPrice) {
		myWallet.send(targetAddress, amountWei, {
				gasPrice: gasPrice,
				gasLimit: 21000,
		}).then(function(txid) {
			console.log('success', txid);
		});
	});
}

module.exports = (express) => {
	var router      = express.Router();

	// Router Middleware
	router.use((req, res, next) => {
	    // log each request to the console
	    console.log("You have hit the /api", req.method, req.url);

	    // Remove powered by header
	    //res.set('X-Powered-By', ''); // OLD WAY
	    //res.removeHeader("X-Powered-By"); // OLD WAY 2
	    // See bottom of script for better way

	    // CORS
	    res.header("Access-Control-Allow-Origin", "*"); //TODO: potentially switch to white list version
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	    // we can use this later to validate some stuff

	    // continue doing what we were doing and go to the route
	    next();
	});

	// API ROOT - Display Available Routes
	router.get('/', (req, res) => {
	    res.jsonp({
	        name: 'ATHA API',
	        version: '1.0',
	    });
	});

	// Simple MySQL Test
	router.get('/test', (req, res) => {
	    var test;
			// Setup MySQL Connection

			// Connect to MySQL DB

	    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
	        if (err) {
						throw err;
					}

	        test = rows[0].solution;

	        res.jsonp({
	            'test': test
	        });


	    });


	});


	router.post('/login', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log(data.api_key);
			if (data.api_key == API_KEY){

				// Connect to MySQL DB

				var query = connection.query('SELECT * FROM tbl_fans WHERE email=? AND password=?', [data.email, data.password], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows);
						if (rows.length == 1){
							res.jsonp({
								status: 'success',
								message: 'SUCCESSFULLY LOGGED IN',
								user: rows[0]
							});
						} else {
							res.jsonp({
								status: 'failed',
								message: 'INVALID PASSWORD OR EMAIL.',
								user: rows[0]
							});
						}

				});

				console.log(query.sql);
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/forgot', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log(data.api_key);
			if (data.api_key == API_KEY){
				// Connect to MySQL DB
				var query = connection.query('SELECT * FROM tbl_fans WHERE email=?', [data.email], (err, rows, fields) => {
						if (err) console.error(err);
						if (rows.length == 1){
							new_pass = makeid();
							connection.query('UPDATE tbl_fans SET password = ? WHERE email=?', [new_pass, data.email], (err, result) => {
								if (err){
									res.jsonp({
										status: 'failed',
										message: 'INVALID EMAIL.',
										user: []
									});
								} else {
									var nodemailer = require('nodemailer');
									// var transporter = nodemailer.createTransport({
									// 	host: "smtp.gmail.com", // hostname
    							// 	secureConnection: true, // use SSL
    							// 	port: 25, // port for secure SMTP
									//   auth: {
									//     user: 'athleticoinapps@gmail.com',
									//     pass: 'pass4ATHLETICOIN'
									//   },
									// 	debug: true,
									// });
									var transporter = nodemailer.createTransport({
										host: "bsemailmarketing.smtp.com", // hostname
    								secureConnection: true, // use SSL
    								port: 25025, // port for secure SMTP
									  auth: {
									    user: 'platben',
									    pass: 'ZdpDs95R'
									  },
										debug: true,
									});
									var mailOptions = {
									  from: 'athleticoinapps@gmail.com',
									  to: data.email,
									  subject: 'NEW PASSWORD FROM ATHA',
									  text: 'Your  password  has  been  reset.  Please  return  to  the  app  and  use  this  password  to  login.\n' + new_pass,
										html: '<b>Your  password  has  been  reset.  Please  return  to  the  app  and  use  this  password  to  login.</b><h1>' + new_pass + '</h1>'
									};

									transporter.sendMail(mailOptions, function(error, info){
									  if (error) {
									    console.log(error);
											res.jsonp({
												status: 'failed',
												message: 'email sent failed',
												user: []
											});
									  } else {
									    console.log('Email sent: ' + info.response);
											res.jsonp({
												status: 'success',
												message: 'successfully sent',
												user: []
											});
									  }
									});
								}
							});
						} else {
							res.jsonp({
								status: 'failed',
								message: 'INVALID EMAIL.',
								user: []
							});
						}
				});

				console.log(query.sql);
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});
	router.post('/resetpassword', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log(data.api_key);
			if (data.api_key == API_KEY){
				// Connect to MySQL DB
				var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
						if (err) console.error(err);
						if (rows.length == 1){
							connection.query('UPDATE tbl_fans SET password = ? WHERE id=?', [data.password, data.user_id], (err, result) => {
								if (err){
									res.jsonp({
										status: 'failed',
										message: 'INVALID USER ID.',
										res: []
									});
								} else {
											res.jsonp({
												status: 'success',
												message: 'password successfully updated!',
												res: []
											});
								}
							});
						} else {
							res.jsonp({
								status: 'failed',
								message: 'INVALID USER ID.',
								res: []
							});
						}
				});

				console.log(query.sql);
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});
	router.post('/register', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log(data.api_key);
			if (data.api_key == API_KEY){
				// Connect to MySQL DB
				var query = connection.query('SELECT * FROM tbl_fans WHERE email=?', [data.email], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows.length);
						if (rows.length == 0){
							var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
							var api = 'https://api.blockcypher.com/v1/eth/main/addrs';
							request.post(api, function (error, response, wallet_data) {
								if (error == null){
									console.log('wallet_data',response);
									wallet_data = JSON.parse(wallet_data);
									console.log(wallet_data.address);
									console.log(wallet_data.private);
									connection.query('INSERT INTO tbl_fans (name, email, password, phone_number, country, wallet_address, private_key, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
									[data.name, data.email, data.password, data.phone_number, data.country, '0x'+wallet_data.address, wallet_data.private, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP],
									(err, results) => {
										if(err){
												console.error(err);
												res.jsonp({
													status: 'failed',
													message: err,
													user: []
												});
										} else {
												console.log('results', results);
												connection.query('SELECT * FROM tbl_fans WHERE id=?', [results.insertId], (err, result_users) => {
													if (err) console.error(err);
													res.jsonp({
														status: 'success',
														message: 'SUCCESSFULLY REGISTERED.',
														user: result_users[0]
													});

												});
										}
									});
								}
  							console.log('error:', error); // Print the error if one occurred
  							console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
							});
						} else {
							res.jsonp({
								status: 'failed',
								message: 'EMAIL IS ALREADY THERE.',
								user: []
							});
						}
				});
				console.log(query.sql);
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/get_eth_balance', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log(data.api_key);
			if (data.api_key == API_KEY){

				// Connect to MySQL DB
				var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows);
						if (rows.length == 1){
							address = rows[0].wallet_address;
							var ethers = require('ethers');
							var providers = ethers.providers;
							var provider = new providers.getDefaultProvider(providers.networks.mainnet);
							provider.getBalance(address).then(function(balance) {
									var etherString = ethers.utils.formatEther(balance);
									res.jsonp({
										status: 'success',
										message: 'got balance',
										balance: etherString
									});
							});
						} else {
							res.jsonp({
								status: 'failed',
								message: 'incorret user_id'
							});
						}
				});
				console.log(query.sql);
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});

			}
	});

	router.post('/get_atha_balance', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log(data.api_key);
			if (data.api_key == API_KEY){

				// Connect to MySQL DB

				var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows);
						if (rows.length == 1){
							address = rows[0].wallet_address;
							var ethers = require('ethers');
							var providers = ethers.providers;
							var provider = new providers.getDefaultProvider(providers.networks.mainnet);
							tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, provider);
							var callPromise = tokenContract.functions.balanceOf(address);
							callPromise.then(function(result_bal) {
									var trueBal = result_bal.toString(10);
									var n = trueBal * 0.000000000000000001;
									var atyxValue = n.toLocaleString(
											undefined, // use a string like 'en-US' to override browser locale
											{
													minimumFractionDigits: 4
											}
									);

									res.jsonp({
										status: 'success',
										message: 'got balance',
										balance: atyxValue
									});
							})
							.catch(function(error){
								res.jsonp({
									status: 'failed',
									message: 'error',
									res: error
								});
							});
						} else {
							res.jsonp({
								status: 'failed',
								message: 'incorret user_id'
							});

						}
				});
				console.log(query.sql);
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/get_transaction_history', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){

				// Connect to MySQL DB

				var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows);
						if (rows.length == 1){
							address = rows[0].wallet_address;
							var ethers = require('ethers');
							var provider = new ethers.providers.EtherscanProvider();

							provider.getHistory(address).then(function(history) {
									for (var i in history){
										console.log(history[i].value);
										amount = ethers.utils.formatEther(history[i].value);
										history[i].value = amount;
									}
									res.jsonp({
											status: 'success',
											message: 'got transactions',
											transactions: history
									});
							});
						} else {
							res.jsonp({
								status: 'failed',
								message: 'incorret user_id'
							});
						}

				});
				console.log(query.sql);
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/get_logs', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){
				// Connect to MySQL DB
				var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
						if (err) {
							console.log(err);
							throw err;
						}
						if (rows.length == 1){
							address = rows[0].wallet_address;
							var Web3 = require('web3');
							web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/BceusOxaYwbSwW4JpH94'));
							var contract = new web3.eth.Contract(ATHA_ABI, ATHA_CONTRACT_ADDRESS);
							var ethers = require('ethers');
							var provider = new ethers.providers.EtherscanProvider();

							var options =  {
    							filter: {_from: address},
    							fromBlock: 0,
    							toBlock: 'latest'
							};
							if (data.action == 'receive'){
								options = {
	    							filter: {_to: address},
	    							fromBlock: 0,
	    							toBlock: 'latest'
								};
							}

							contract.getPastEvents('Transfer', options, function(error, events){
								event_logs = [];
								console.log('past event', events);
								if (events.length > 0){
									for (i=0; i<events.length; i++) {
												var eventObj = events[i];
												amount = web3.utils.fromWei(eventObj.returnValues._value, 'ether');
												eventObj.returnValues._value = amount;
												var transactionHash = eventObj.transactionHash;
												console.log('transaction hash', transactionHash);
												web3.eth.getTransaction(transactionHash).then(function(transaction){
													  console.log('transaction', transaction);
														web3.eth.getBlock(transaction.blockNumber).then(function(block){
																eventObj.returnValues.timestamp = block.timestamp;
																event_logs.push(eventObj.returnValues);
																if (event_logs.length == events.length){
																	res.jsonp({
																		status: 'success',
																		message: 'got events',
																		events: event_logs
																	});
																}
														});
												});
									}
								} else {
									res.jsonp({
										status: 'success',
										message: 'got events',
										events: event_logs
									});
								}
							});
						} else {
							res.jsonp({
								status: 'failed',
								message: 'incorret user_id'
							});
						}
				});
				console.log(query.sql);
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/send_eth', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){
				// Connect to MySQL DB

				var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows);
						if (rows.length == 1){
							address = rows[0].wallet_address;
							var ethers = require('ethers');
							var provider = ethers.providers.getDefaultProvider();
							var myWallet = new ethers.Wallet('0x'+rows[0].private_key, provider);
			        var targetAddress = ethers.utils.getAddress(data.to_address);
							amountWei = data.to_amount * ethers.utils.bigNumberify("1000000000000000000");
							provider.getGasPrice().then(function(gasPrice) {
								myWallet.send(targetAddress, amountWei, {
										gasPrice: gasPrice,
										gasLimit: 21000,
								}).then(function(txid) {
									res.jsonp({
											status: 'success',
											message: 'SUCCESSFULLY SENT',
											res: txid
									});
								});
							});
						} else {
							res.jsonp({
								status: 'failed',
								message: 'incorret user_id'
							});
						}

				});
				console.log(query.sql);
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/send_atha', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){

				// Connect to MySQL DB

				var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
						if (err) console.error(err);
						console.log('rows', rows.length);
						if (rows.length == 1){
							address = rows[0].wallet_address;
							var ethers = require('ethers');
							var targetAddress = ethers.utils.getAddress(data.to_address);
							var amount = ethers.utils.bigNumberify("1000000000000000000").mul(data.to_amount);

							myWallet = new ethers.Wallet('0x'+rows[0].private_key);
							var provider = ethers.providers.getDefaultProvider('ropsten');
							myWallet.provider = provider;
							tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, myWallet);

							provider.getGasPrice().then(function(gasPrice) {
								console.log('gasPrice', gasPrice);
								tokenContract.functions.transfer(targetAddress, amount, {
									gasPrice: gasPrice,
				          gasLimit: 65000,
								}).then(function(txid) {
									res.jsonp({
										status: 'success',
										message: 'SUCCESSFULLY SENT',
										res:txid
									});
								});
							});

						} else {
							res.jsonp({
								status: 'failed',
								message: 'incorret user_id'
							});
						}

				});
				console.log(query.sql);
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/get_gas', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){

				// Connect to MySQL DB

				var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows);
						if (rows.length == 1){
							address = rows[0].wallet_address;
							var ethers = require('ethers');
							var provider = ethers.providers.getDefaultProvider();
							provider.getGasPrice().then(function(gasPrice) {
								gasPriceString = ethers.utils.formatEther(gasPrice, {pad: true})
								gasfee = ethers.utils.formatEther(gasPrice*21000, {pad: true})
								res.jsonp({
									status: 'success',
									message: 'SUCCESSFULLY GOT',
									gasdata: {
											gasLimit: 21000,
											gasPrice: gasPriceString,
											gasfee: gasfee
									}
								});
							});
						} else {
							res.jsonp({
								status: 'failed',
								message: 'incorret user_id'
							});
						}

				});
				console.log(query.sql);
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/get_events', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){
				query = 'SELECT tbl_events.*, tbl_sports.SportName as sport, tbl_leagues.LeagueName as league FROM tbl_events left join tbl_sports on tbl_sports.id = tbl_events.sport_id left join tbl_leagues on tbl_leagues.id = tbl_events.league_id';
				query_where = '';
				if (data.sport != ''){
					query_where = ' WHERE sport like "%' + data.sport + '%"';
				}

				if (data.keyword != ''){
					if (query_where == ''){
						query_where = ' WHERE tbl_leagues.LeagueName like "%' + data.keyword + '%" OR tbl_events.event_hostname like "%' + data.keyword + '%"';
					} else {
						query_where = query_where + ' AND (tbl_leagues.LeagueName like "%' + data.keyword + '%" OR tbl_events.event_hostname like "%' + data.keyword + '%")';
					}
				}

				if (data.status != ''){
					if (query_where == ''){
						query_where = ' WHERE tbl_events.status = "' + data.status + '"';
					} else {
						query_where = query_where + ' AND tbl_events.status = "' + data.status + '"';
					}
				}
				query = query + query_where;
				console.log(query);
				connection.query(query, [], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows);
						res.jsonp({
							status: 'success',
							message: 'SUCCESSFULLY GOT',
							events: rows
						});

				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
						events:[]
				});
			}
	});

	router.post('/get_participants', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){

				// Connect to MySQL DB

				query = 'SELECT tbl_participants.*, tbl_teams.TeamName as team, tbl_leagues.LeagueName as league FROM tbl_participants left join tbl_teams on tbl_teams.id = tbl_participants.team_id\
				left join tbl_leagues on tbl_leagues.id = tbl_participants.league_id right join tbl_event_part on tbl_event_part.part_id = tbl_participants.id';
				query_where = '';
				if (data.event_id != ''){
					query_where = ' WHERE tbl_event_part.event_id = ' + data.event_id;
				}
				query = query + query_where;
				console.log(query);
				connection.query(query, [], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows);
						res.jsonp({
							status: 'success',
							message: 'SUCCESSFULLY GOT',
							parts: rows
						});

				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
						parts: []
				});
			}
	});

	router.post('/get_top_athletes', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){

				// Connect to MySQL DB

				query = 'SELECT tbl_participants.*, SUM(tbl_votes.vote_amount) AS total_amount FROM tbl_participants RIGHT JOIN tbl_votes ON tbl_votes.part_id = tbl_participants.id';
				query_where = '';
				if (data.event_id != ''){
					query_where = ' WHERE tbl_votes.event_id = ' + data.event_id;
				}

				query = query + query_where;
				query = query + ' GROUP BY tbl_votes.part_id ORDER BY total_amount DESC LIMIT 5';

				console.log(query);
				connection.query(query, [], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows);
						res.jsonp({
							status: 'success',
							message: 'SUCCESSFULLY GOT',
							athletes: rows
						});

				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
						athletes: []
				});
			}
	});

	router.post('/get_top_fans', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){
				query = 'SELECT tbl_fans.*, SUM(tbl_votes.vote_amount) AS total_amount FROM tbl_fans RIGHT JOIN tbl_votes ON tbl_votes.fan_id = tbl_fans.id';
				query_where = '';
				if (data.event_id != ''){
					query_where = ' WHERE tbl_votes.event_id = ' + data.event_id;
				}

				query = query + query_where;
				query = query + ' GROUP BY tbl_votes.fan_id ORDER BY total_amount DESC LIMIT 5';

				console.log(query);
				connection.query(query, [], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows);
						res.jsonp({
							status: 'success',
							message: 'SUCCESSFULLY GOT',
							fans: rows
						});

				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
						fans: []
				});
			}
	});

	router.post('/get_selling_request', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){

				// Connect to MySQL DB

				query = 'SELECT tbl_selling_requests.*, tbl_fans.name as seller FROM tbl_selling_requests LEFT JOIN tbl_fans ON tbl_fans.id = tbl_selling_requests.seller_id WHERE status = "open"';
				connection.query(query, [], (err, rows, fields) => {
						if (err) console.error(err);
						console.log(rows);
						res.jsonp({
							status: 'success',
							message: 'SUCCESSFULLY GOT',
							res: rows
						});

				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/set_selling_request', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){
				// Connect to MySQL DB
				var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
				connection.query('INSERT INTO tbl_selling_requests (selling_amount, seller_id, price, status, created_at) VALUES (?, ?, ?, ?, ?)', [data.selling_amount, data.seller_id, data.selling_price, "open", CURRENT_TIMESTAMP], (err, results) => {
					if(err){
							console.error(err);
					} else {
							connection.query('SELECT tbl_selling_requests.*, tbl_fans.* FROM tbl_selling_requests left join tbl_fans on tbl_fans.id = tbl_selling_requests.seller_id WHERE tbl_selling_requests.id=?', [results.insertId], (err, result_requests) => {
								if (err) {
										console.error(err);
										res.jsonp({
											status: 'failed',
											message: 'cannot find request',
											selling_request: []
										});
								} else {
									// seller_address = result_requests[0].wallet_address;
									// seller_private_key = result_requests[0].private_key;
									// amount = result_requests[0].amount;
									// send_token(app_address, amount, seller_private_key);
									res.jsonp({
										status: 'success',
										message: 'SUCCESSFULLY REGISTERED.',
										selling_request: result_requests[0]
									});
								}
							});
					}
				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/set_buying_request', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){
				// Connect to MySQL DB
				var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
				connection.query('SELECT tbl_selling_requests.*, tbl_fans.* FROM tbl_selling_requests left join tbl_fans on tbl_fans.id = tbl_selling_requests.seller_id WHERE tbl_selling_requests.id=?', [data.request_id], (err, result_requests) => {
					if (err) {
						console.error(err);
					} else {
						console.log(result_requests);
						address = result_requests[0].wallet_address;
						var ethers = require('ethers');
						var providers = ethers.providers;
						var provider = new providers.getDefaultProvider(providers.networks.mainnet);
						tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, provider);
						var callPromise = tokenContract.functions.balanceOf(address);
						callPromise.then(function(result_bal) {
								var trueBal = result_bal.toString(10);
								var n = trueBal * 0.000000000000000001;
								var atyxValue = n.toLocaleString(
										undefined, // use a string like 'en-US' to override browser locale
										{
												minimumFractionDigits: 4
										}
								);
								if (n < result_requests[0].selling_amount){
									res.jsonp({
										status: 'failed',
										message: 'Try it later or another request!',
										res:[]
									});
								} else {
									connection.query('UPDATE tbl_selling_requests SET buyer_id = ?, status = ?, updated_at = ? WHERE id = ?', [data.buyer_id, "closed", CURRENT_TIMESTAMP, data.request_id], (err, results) => {
										if(err){
												console.error(err);
										} else {
												console.log(results);
												connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.buyer_id], (err, rows, fields) => {
													if (err){
														console.log(err);
													} else {
														if (rows.length == 1){
															seller_address = result_requests[0].wallet_address;
															seller_private_key = result_requests[0].wallet_address;
															buyer_private_key = rows[0].private_key;
															buyer_address = rows[0].wallet_address;
															token_amount = result_requests[0].selling_amount;
															eth_amount = result_requests[0].price;
															fee = eth_amount * 2 / 100;
															send_eth(app_address, fee, buyer_private_key);
															send_eth(seller_address, eth_amount, buyer_private_key);
															send_token(buyer_address, token_amount, seller_private_key);
															res.jsonp({
																status: 'success',
																message: 'updated',
																res: []
															});
														} else {
															res.jsonp({
																status: 'failed',
																message: 'Cannot find buyer',
																res: []
															});
														}
													}
												});
										}
									});
								}
						});

					}
				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/submit_vote', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){
				connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.fan_id], (err, rows, fields) => {
					 // Connect to MySQL DB
					 if (data.vote_amount != 0){
						address = rows[0].wallet_address;
						var ethers = require('ethers');
						var targetAddress = app_address;
						var amount = data.vote_amount * ethers.utils.bigNumberify("1000000000000000000");
						myWallet = new ethers.Wallet(rows[0].private_key);
						var provider = ethers.providers.getDefaultProvider();
						myWallet.provider = provider;
						tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, myWallet);
						tokenContract.estimate.transfer(targetAddress, amount).then(function(gasCost){
							tokenContract.transfer(targetAddress, amount, {
									gas: gasCost,
								//	gasLimit: 65000,
							})
							.then(function(txid) {
								var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
								connection.query('INSERT INTO tbl_votes (event_id, fan_id, part_id, vote_amount, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
								[data.event_id, data.fan_id, data.part_id, data.vote_amount, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP],
								(err, results) => {
									if(err){
											console.error(err);
									} else {
											connection.query('SELECT * FROM tbl_votes WHERE id=?', [results.insertId], (err, result_requests) => {
												if (err) console.error(err);
												res.jsonp({
													status: 'success',
													message: 'SUCCESSFULLY SUBMITTED.',
													vote: result_requests[0]
												});
											});
									}
								});
							})
							.catch(function(err){
									console.log(err);
							});
						});
				} else {
					res.jsonp({
						status: 'failed',
						message: 'FAILED SUBMITTED. AMOUNT 0',
						vote: []
					});
				}
				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/give_redeem', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){
				// Connect to MySQL DB
				var api = 'https://api.blockcypher.com/v1/eth/main/addrs';
				request.post(api, function (error, response, wallet) {
					var wallet_data = JSON.parse(wallet);
					console.log(wallet_data);
					console.log('private', wallet_data.private);
					console.log('address', wallet_data.address);
					var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
							if (err) console.error(err);
							console.log('rows', rows.length);
							if (rows.length == 1){
								address = rows[0].wallet_address;
								var ethers = require('ethers');
								var targetAddress = ethers.utils.getAddress(wallet_data['address']);

								//var amount = ethers.utils.bigNumberify("1000000000000000000") * data.eth_amount;

								myWallet = new ethers.Wallet('0x'+rows[0].private_key);
								var provider = ethers.providers.getDefaultProvider('ropsten');
								myWallet.provider = provider;
								tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, myWallet);

								var atha_amount = data.atha_amount
								provider.getGasPrice().then(function(gasPrice) {
									console.log('gasPrice', ethers.utils.bigNumberify(gasPrice).toString());
									tokenContract.functions.redeem(targetAddress, data.atha_amount, {
										value: ethers.utils.parseEther(data.eth_amount)
									}).then(function(txid) {
										var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
										var redeem_code = makeRedeemCode();
										connection.query('INSERT INTO mobile_redeems (title, description, redeem_code, redeem_date, target_address, private_key, amount, status, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
										[ data.title, data.description,redeem_code,CURRENT_TIMESTAMP, wallet_data.address, wallet_data.private, data.atha_amount, 'opened', data.user_id, CURRENT_TIMESTAMP ],
										(err, results) => {
											if(err){
													console.error(err);
											} else {
												res.jsonp({
													status: 'success',
													message: 'SUCCESSFULLY MADE',
													res:txid
												});
											}
										});
									});
								});
							} else {
								res.jsonp({
									status: 'failed',
									message: 'incorret user_id'
								});
							}
					});
				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/sent_redeems', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){
				// Connect to MySQL DB
				connection.query('SELECT * FROM mobile_redeems WHERE created_by=?', [data.user_id], (err, result_requests) => {
					if (err) console.error(err);
					res.jsonp({
						status: 'success',
						message: 'SUCCESSFULLY REGISTERED.',
						res: result_requests
					});
				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/received_redeems', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){
				// Connect to MySQL DB
				connection.query('SELECT * FROM mobile_redeems WHERE received_by=?', [data.user_id], (err, result_requests) => {
					if (err) console.error(err);
					res.jsonp({
						status: 'success',
						message: 'SUCCESSFULLY REGISTERED.',
						res: result_requests
					});
				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	router.post('/get_redeem', (req, res) => {
			var data = req.body; // maybe more carefully assemble this data
			console.log('api_key', data.api_key);
			if (data.api_key == API_KEY){
				// Connect to MySQL DB
				connection.query('SELECT * FROM mobile_redeems WHERE redeem_code=? AND status=?', [data.redeem_code, "opened"], (err, result_requests) => {
					if (err) {
						console.error(err);
						return;
					}
					var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
					connection.query('UPDATE mobile_redeems SET received_by = ?, status = ?, updated_at = ? WHERE id = ?', [data.user_id, 'closed', CURRENT_TIMESTAMP, result_requests[0].id], (err, results) => {
						if(err){
								console.error(err);
						} else {
								console.log(results);
								result_requests[0].received_by = data.user_id;
								result_requests[0].status = 'closed';
								res.jsonp({
									status: 'success',
									message: 'SUCCESSFULLY REGISTERED.',
									res: result_requests[0]
								});
						}
					});
				});
			} else {
				res.jsonp({
						status: 'failed',
						message: 'API KEY IS INVALID',
				});
			}
	});

	return router;
};
