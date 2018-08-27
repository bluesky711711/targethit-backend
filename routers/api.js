//Dependencies - Express 4.x and the MySQL Connection
const API_KEY = "TARGETHIT_API_KEY_1.0";

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


var CONTRACT_ADDRESS = '0xc83d46e4d1E290Fa414a5775D90D5d50745c3281';
const ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],
"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"GetPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amounts","type":"uint256[]"},
{"name":"_recipient","type":"address[]"}],"name":"deployTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"newPrice","type":"uint256"}],"name":"setPrices","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[],"name":"buy","outputs":[{"name":"amount","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},
{"constant":false,"inputs":[{"name":"_newaddress","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],
"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},
{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},
{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];


var CONTRACT_ADDRESS_TEST = '0x7C00D9B41c580d09B37fa76bdc0f6A93B9e439Fb';
const ABI_TEST = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],
"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"GetPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"_amounts","type":"uint256[]"},{"name":"_recipient","type":"address[]"}],"name":"deployTokens",
"outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newPrice","type":"uint256"}],"name":"setPrices",
"outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[{"name":"amount","type":"uint256"}],
"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newaddress","type":"address"}],
"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},
{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},
{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},
{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];


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

	router.post('/getwalletinfo', (req, res) => {
		var data = req.body; // maybe more carefully assemble this data
		console.log(data.api_key);
		if (data.api_key == API_KEY){
			if (data.user_id != ''){
					var query = connection.query('SELECT * FROM wp_wallets WHERE user_id=?', [data.user_id], (err, rows, fields) => {
						if (err) {
							console.log(err);
							res.jsonp({
								status: 'failed',
								message: 'Mysql Query failed.',
								res: []
							});
						} else {
								if (rows.length == 1){
									wallet_address = rows[0].wallet_address;
									var ethers = require('ethers');
									var providers = ethers.providers;
									var provider = new providers.getDefaultProvider(providers.networks.mainnet);
									provider.getBalance(wallet_address).then(function(balance) {
										var etherString = ethers.utils.formatEther(balance);
										tokenContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
										var callPromise = tokenContract.functions.balanceOf(wallet_address);
										callPromise.then(function(result_bal) {
											console.log('result bal', result_bal);
											var trueBal = result_bal.toString(10);
											var n = trueBal / 100000000;
											var atyxValue = n.toLocaleString(
												undefined, // use a string like 'en-US' to override browser locale
												{
													minimumFractionDigits: 4
												}
											);

											res.jsonp({
												status: 'success',
												message: 'got balance',
												res: {wallet_address: wallet_address, tgh_balance:atyxValue, eth_balance: etherString}
											});
										})
										.catch(function(error){
											res.jsonp({
												status: 'failed',
												message: 'token balance error',
												res: error
											});
										});
									});
								} else {
									var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
									var api = 'https://api.blockcypher.com/v1/eth/main/addrs';
									request.post(api, function (error, response, wallet_data) {
										if (error == null){
											console.log('wallet_data',response);
											wallet_data = JSON.parse(wallet_data);
											console.log(wallet_data.address);
											console.log(wallet_data.private);
											connection.query('INSERT INTO wp_wallets (user_id, wallet_address, private_key, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
											[data.user_id, '0x'+wallet_data.address, wallet_data.private, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP],
											(err, results) => {
												if(err){
														console.error(err);
														res.jsonp({
															status: 'failed',
															message: err,
															res: []
														});
												} else {
													res.jsonp({
														status: 'success',
														message: "successfully got balance",
														res: {wallet_address: '0x'+wallet_data.address, tgh_balance:0, eth_balance: 0}
													});
												}
											});
										}
									});
								}
						}
					})
			}
		}
	});

	router.post('/send_tgh', (req, res) => {
		var data = req.body; // maybe more carefully assemble this data
		console.log(data.api_key);
		if (data.api_key == API_KEY){
			var query = connection.query('SELECT * FROM wp_wallets WHERE user_id=?', [data.user_id], (err, rows, fields) => {
					if (err) console.error(err);
					console.log(rows);
					if (rows.length == 1){
						address = rows[0].wallet_address;
						private_key = rows[0].private_key;

						query = connection.query('SELECT * FROM wp_wallets WHERE user_id=?', [data.target_user_id], (err, rows1, fields) => {
							if (err) {
								console.error(err);
								res.jsonp({
									status: 'failed',
									message: 'error target user'
								});
								return;
							}
							var ethers = require('ethers');
							console.log(private_key);
							myWallet = new ethers.Wallet('0x'+private_key);
							var providers = ethers.providers;
							var provider = new providers.getDefaultProvider(providers.networks.mainnet);
							myWallet.provider = provider;
							tokenContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, myWallet);

							if (rows1.length == 0){
								console.log('empty');
								var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
								var api = 'https://api.blockcypher.com/v1/eth/main/addrs';
								request.post(api, function (error, response, wallet_data) {
									if (error == null){
										console.log('wallet_data',response);
										wallet_data = JSON.parse(wallet_data);
										console.log(wallet_data.address);
										console.log(wallet_data.private);
										connection.query('INSERT INTO wp_wallets (user_id, wallet_address, private_key, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
										[data.target_user_id, '0x'+wallet_data.address, wallet_data.private, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP],
										(err, results) => {
											if(err){
													console.error(err);
													res.jsonp({
														status: 'failed',
														message: err,
														res: []
													});
											} else {
												var targetAddress = ethers.utils.getAddress('0x'+wallet_data.address);
												var amount = data.to_amount * ethers.utils.bigNumberify("100000000");
												provider.getGasPrice().then(function(gasPrice) {
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
											}
										});
									}
								});
							}
							else {
								target_address = rows1[0].wallet_address;
								var targetAddress = ethers.utils.getAddress(target_address);
								var amount = data.to_amount * ethers.utils.bigNumberify("100000000");
								console.log(target_address);
								console.log(amount);
								provider.getGasPrice().then(function(gasPrice) {
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
							}
						});
					} else {
						res.jsonp({
							status: 'failed',
							message: 'incorret user_id'
						});
					}
			});
		}
	});



	router.post('/get_gas', (req, res) => {
		var data = req.body; // maybe more carefully assemble this data
		console.log('api_key', data.api_key);
		if (data.api_key == API_KEY){
			// Connect to MySQL DB
			var query = connection.query('SELECT * FROM wp_wallets WHERE user_id=?', [data.user_id], (err, rows, fields) => {
				if (err) console.error(err);
				if (rows.length > 0){
					address = rows[0].wallet_address;
					var ethers = require('ethers');
					var provider = ethers.providers.getDefaultProvider(ethers.providers.networks.mainnet);
					provider.getGasPrice().then(function(gasPrice) {
						gasPriceString = ethers.utils.formatEther(gasPrice, {pad: true});
						gasfee = ethers.utils.formatEther(gasPrice*65000, {pad: true});
						console.log('getgasprice', gasPriceString);
						console.log('gasfee', gasfee);
						res.jsonp({
							status: 'success',
							message: 'SUCCESSFULLY GOT',
							gasdata: {
								gasLimit: 65000,
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
		} else {
			res.jsonp({
				status: 'failed',
				message: 'API KEY IS INVALID',
			});
		}
	});

	router.post('/testwebsocket', (req, res) => {
		var WebSocket = require('rpc-websockets').Client;
		var ws = new WebSocket('ws://35.176.179.27:8090/');
		ws.on('open', function() {
  		// call an RPC method with parameters
  		ws.call('server.time', []).then(function(result) {
				ws.close();
    		console.log('server.time:', result);
				res.jsonp({
					status: 'success',
					message: 'called',
				});
  		})
		});
	});

	// router.post('/resetpassword', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log(data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		// Connect to MySQL DB
	// 		var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
	// 			if (err) console.error(err);
	// 			if (rows.length == 1){
	// 				connection.query('UPDATE tbl_fans SET password = ? WHERE id=?', [data.password, data.user_id], (err, result) => {
	// 					if (err){
	// 						res.jsonp({
	// 							status: 'failed',
	// 							message: 'INVALID USER ID.',
	// 							res: []
	// 						});
	// 					} else {
	// 						res.jsonp({
	// 							status: 'success',
	// 							message: 'password successfully updated!',
	// 							res: []
	// 						});
	// 					}
	// 				});
	// 			} else {
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'INVALID USER ID.',
	// 					res: []
	// 				});
	// 			}
	// 		});
	// 		console.log(query.sql);
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	//
	//
	// router.post('/get_eth_balance', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log(data.api_key);
	// 	if (data.api_key == API_KEY){
	//
	// 		// Connect to MySQL DB
	// 		var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
	// 			if (err) console.error(err);
	// 			console.log(rows);
	// 			if (rows.length == 1){
	// 				address = rows[0].wallet_address;
	// 				var ethers = require('ethers');
	// 				var providers = ethers.providers;
	// 				var provider = new providers.getDefaultProvider(providers.networks.mainnet);
	// 				provider.getBalance(address).then(function(balance) {
	// 					var etherString = ethers.utils.formatEther(balance);
	// 					res.jsonp({
	// 						status: 'success',
	// 						message: 'got balance',
	// 						balance: etherString
	// 					});
	// 				});
	// 			} else {
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'incorret user_id'
	// 				});
	// 			}
	// 		});
	// 		console.log(query.sql);
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	//
	// 	}
	// });
	//
	// router.post('/get_atha_balance', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log(data.api_key);
	// 	if (data.api_key == API_KEY){
	//
	// 		// Connect to MySQL DB
	//
	// 		var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
	// 			if (err) console.error(err);
	// 			console.log(rows);
	// 			if (rows.length == 1){
	// 				address = rows[0].wallet_address;
	// 				var ethers = require('ethers');
	// 				var providers = ethers.providers;
	// 				var provider = new providers.getDefaultProvider(providers.networks.mainnet);
	// 				tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, provider);
	// 				var callPromise = tokenContract.functions.balanceOf(address);
	// 				callPromise.then(function(result_bal) {
	// 					var trueBal = result_bal.toString(10);
	// 					var n = trueBal * 0.000000000000000001;
	// 					var atyxValue = n.toLocaleString(
	// 						undefined, // use a string like 'en-US' to override browser locale
	// 						{
	// 							minimumFractionDigits: 4
	// 						}
	// 					);
	//
	// 					res.jsonp({
	// 						status: 'success',
	// 						message: 'got balance',
	// 						balance: atyxValue
	// 					});
	// 				})
	// 				.catch(function(error){
	// 					res.jsonp({
	// 						status: 'failed',
	// 						message: 'error',
	// 						res: error
	// 					});
	// 				});
	// 			} else {
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'incorret user_id'
	// 				});
	//
	// 			}
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	// router.post('/get_transaction_history', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	//
	// 		// Connect to MySQL DB
	//
	// 		var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
	// 			if (err) console.error(err);
	// 			if (rows.length == 1){
	// 				address = rows[0].wallet_address;
	// 				var ethers = require('ethers');
	// 				var provider = new ethers.providers.EtherscanProvider();
	//
	// 				provider.getHistory(address).then(function(history) {
	// 					for (var i in history){
	// 						console.log(history[i].value);
	// 						amount = ethers.utils.formatEther(history[i].value);
	// 						history[i].value = amount;
	// 					}
	// 					res.jsonp({
	// 						status: 'success',
	// 						message: 'got transactions',
	// 						transactions: history
	// 					});
	// 				});
	// 			} else {
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'incorret user_id'
	// 				});
	// 			}
	//
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	// router.post('/get_logs', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		// Connect to MySQL DB
	// 		var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
	// 			if (err) {
	// 				console.log(err);
	// 				throw err;
	// 			}
	// 			if (rows.length == 1){
	// 				address = rows[0].wallet_address;
	// 				var Web3 = require('web3');
	// 				web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/BceusOxaYwbSwW4JpH94'));
	// 				var contract = new web3.eth.Contract(ATHA_ABI, ATHA_CONTRACT_ADDRESS);
	// 				var ethers = require('ethers');
	// 				var provider = new ethers.providers.EtherscanProvider();
	// 				var options =  {
	// 					filter: {_from: address},
	// 					fromBlock: 0,
	// 					toBlock: 'latest'
	// 				};
	// 				if (data.action == 'receive'){
	// 					options = {
	// 						filter: {_to: address},
	// 						fromBlock: 0,
	// 						toBlock: 'latest'
	// 					};
	// 				}
	//
	// 				contract.getPastEvents('Transfer', options, function(error, events){
	// 					event_logs = [];
	// 					if (events && events.length > 0){
	// 						for (i=0; i<events.length; i++) {
	// 							var eventObj = events[i];
	// 							amount = web3.utils.fromWei(eventObj.returnValues._value, 'ether');
	// 							eventObj.returnValues._value = amount;
	// 							var transactionHash = eventObj.transactionHash;
	// 							web3.eth.getTransaction(transactionHash).then(function(transaction){
	// 								web3.eth.getBlock(transaction.blockNumber).then(function(block){
	// 									eventObj.returnValues.timestamp = block.timestamp;
	// 									event_logs.push(eventObj.returnValues);
	// 									if (event_logs.length == events.length){
	// 										res.jsonp({
	// 											status: 'success',
	// 											message: 'got events',
	// 											events: event_logs
	// 										});
	// 									}
	// 								});
	// 							});
	// 						}
	// 					} else {
	// 						res.jsonp({
	// 							status: 'success',
	// 							message: 'got events',
	// 							events: event_logs
	// 						});
	// 					}
	// 					console.log('event_logs', event_logs);
	// 				});
	// 			} else {
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'incorret user_id'
	// 				});
	// 			}
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	// router.post('/send_eth', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		// Connect to MySQL DB
	//
	// 		var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
	// 			if (err) console.error(err);
	// 			if (rows.length == 1){
	// 				address = rows[0].wallet_address;
	// 				var ethers = require('ethers');
	// 				var provider = ethers.providers.getDefaultProvider();
	// 				var myWallet = new ethers.Wallet('0x'+rows[0].private_key, provider);
	// 				var targetAddress = ethers.utils.getAddress(data.to_address);
	// 				amountWei = data.to_amount * ethers.utils.bigNumberify("1000000000000000000");
	// 				provider.getGasPrice().then(function(gasPrice) {
	// 					myWallet.send(targetAddress, amountWei, {
	// 						gasPrice: gasPrice,
	// 						gasLimit: 21000,
	// 					}).then(function(txid) {
	// 						res.jsonp({
	// 							status: 'success',
	// 							message: 'SUCCESSFULLY SENT',
	// 							res: txid
	// 						});
	// 					});
	// 				});
	// 			} else {
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'incorret user_id'
	// 				});
	// 			}
	//
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	// router.post('/send_atha', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		// Connect to MySQL DB
	// 		var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
	// 			if (err) console.error(err);
	// 			if (rows.length == 1){
	// 				address = rows[0].wallet_address;
	// 				var ethers = require('ethers');
	// 				var targetAddress = ethers.utils.getAddress(data.to_address);
	// 				var amount = ethers.utils.bigNumberify("1000000000000000000").mul(data.to_amount);
	// 				myWallet = new ethers.Wallet('0x'+rows[0].private_key);
	// 				var providers = ethers.providers;
	// 				var provider = ethers.providers.getDefaultProvider(providers.networks.mainnet);
	// 				myWallet.provider = provider;
	// 				tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, myWallet);
	//
	// 				provider.getGasPrice().then(function(gasPrice) {
	// 					tokenContract.functions.transfer(targetAddress, amount, {
	// 						gasPrice: gasPrice,
	// 						gasLimit: 65000,
	// 					}).then(function(txid) {
	// 						res.jsonp({
	// 							status: 'success',
	// 							message: 'SUCCESSFULLY SENT',
	// 							res:txid
	// 						});
	// 					});
	// 				});
	//
	// 			} else {
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'incorret user_id'
	// 				});
	// 			}
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	//
	// router.post('/get_events', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		query = 'SELECT tbl_events.*, tbl_fans.name as winner_fan_name, tbl_participants.last_name as winner_part_lastname, tbl_participants.first_name as winner_part_firstname, tbl_sports.SportName as sport, tbl_leagues.LeagueName as league FROM tbl_events left join tbl_sports on tbl_sports.id = tbl_events.sport_id left join tbl_leagues on tbl_leagues.id = tbl_events.league_id left join tbl_participants on tbl_participants.id = tbl_events.winner_part_id left join tbl_fans on tbl_fans.id = tbl_events.winner_fan_id';
	// 		query_where = '';
	// 		if (data.sport != ''){
	// 			query_where = ' WHERE tbl_sports.SportName like "%' + data.sport + '%"';
	// 		}
	//
	// 		if (data.keyword != ''){
	// 			if (query_where == ''){
	// 				query_where = ' WHERE tbl_leagues.LeagueName like "%' + data.keyword + '%" OR tbl_events.event_hostname like "%' + data.keyword + '%"';
	// 			} else {
	// 				query_where = query_where + ' AND (tbl_leagues.LeagueName like "%' + data.keyword + '%" OR tbl_events.event_hostname like "%' + data.keyword + '%")';
	// 			}
	// 		}
	//
	// 		if (data.status != ''){
	// 			if (query_where == ''){
	// 				query_where = ' WHERE tbl_events.status = "' + data.status + '"';
	// 			} else {
	// 				query_where = query_where + ' AND tbl_events.status = "' + data.status + '"';
	// 			}
	// 		}
	//
	// 		query = query + query_where;
	// 		connection.query(query, [], (err, rows, fields) => {
	// 			if (err) console.error(err);
	// 			res.jsonp({
	// 				status: 'success',
	// 				message: 'SUCCESSFULLY GOT',
	// 				events: rows
	// 			});
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 			events:[]
	// 		});
	// 	}
	// });
	//
	// router.post('/get_winner_part_amount_by_event', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		var query = connection.query('SELECT * FROM tbl_events WHERE id=? AND status="closed"', [data.event_id], (err, rows, fields) => {
	// 			if (err) {
	// 				console.log(error);
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'Cannot find event.',
	// 					res: []
	// 				});
	// 			} else {
	// 				if (rows.length > 0){
	// 					var event = rows[0];
	// 					var winner_part_id = event.winner_part_id;
	// 					query = connection.query('SELECT SUM(vote_amount) as total FROM tbl_votes WHERE part_id=?', [winner_part_id], (err, rows, fields) => {
	// 						if (!err) {
	// 							var total_amount = 0;
	//
	// 							if (rows.length > 0){
	// 								total_amount = rows[0].total;
	// 							}
	// 							res.jsonp({
	// 								status: 'success',
	// 								message: 'success',
	// 								res: total_amount
	// 							});
	// 						} else {
	// 							res.jsonp({
	// 								status: 'failed',
	// 								message: 'query failed',
	// 								res: []
	// 							});
	// 						}
	// 					});
	// 				} else {
	// 					res.jsonp({
	// 						status: 'failed',
	// 						message: 'Cannot find event.',
	// 						res: []
	// 					});
	// 				}
	// 			}
	// 		});
	// 	}
	// });
	//
	// router.post('/get_winner_fan_amount_by_event', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		var query = connection.query('SELECT * FROM tbl_events WHERE id=? AND status="closed"', [data.event_id], (err, rows, fields) => {
	// 			if (err) {
	// 				console.log(error);
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'Cannot find event.',
	// 					res: []
	// 				});
	// 			} else {
	// 				if (rows.length > 0){
	// 					var event = rows[0];
	// 					var winner_fan_id = event.winner_fan_id;
	// 					console.log('winner_fan_id',winner_fan_id);
	// 					query = connection.query('SELECT SUM(vote_amount) as total FROM tbl_votes WHERE fan_id=?', [winner_fan_id], (err, rows, fields) => {
	// 						if (!err) {
	// 							var total_amount = 0;
	// 							console.log(rows);
	// 							if (rows.length > 0){
	// 								total_amount = rows[0].total;
	// 							}
	// 							res.jsonp({
	// 								status: 'success',
	// 								message: 'success',
	// 								res: total_amount
	// 							});
	// 						} else {
	// 							res.jsonp({
	// 								status: 'failed',
	// 								message: 'query failed',
	// 								res: []
	// 							});
	// 						}
	// 					});
	// 				} else {
	// 					res.jsonp({
	// 						status: 'failed',
	// 						message: 'Cannot find event.',
	// 						res: []
	// 					});
	// 				}
	// 			}
	// 		});
	// 	}
	// });
	//
	// router.post('/get_participants', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	//
	// 		// Connect to MySQL DB
	//
	// 		query = 'SELECT vw_partdisplaydata.*, tbl_teams.TeamName as team, tbl_leagues.LeagueName as league FROM vw_partdisplaydata left join tbl_teams on tbl_teams.id = vw_partdisplaydata.team_id\
	// 		left join tbl_leagues on tbl_leagues.id = vw_partdisplaydata.league_id right join tbl_event_part on tbl_event_part.part_id = vw_partdisplaydata.id';
	// 		query_where = '';
	// 		if (data.event_id != ''){
	// 			query_where = ' WHERE tbl_event_part.event_id = ' + data.event_id;
	// 		}
	// 		query = query + query_where;
	// 		console.log(query);
	// 		connection.query(query, [], (err, rows, fields) => {
	// 			if (err) console.error(err);
	// 			console.log(rows);
	// 			res.jsonp({
	// 				status: 'success',
	// 				message: 'SUCCESSFULLY GOT',
	// 				parts: rows
	// 			});
	//
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 			parts: []
	// 		});
	// 	}
	// });
	//
	// router.post('/get_top_athletes', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	//
	// 		// Connect to MySQL DB
	//
	// 		query = 'SELECT tbl_participants.*, SUM(tbl_votes.vote_amount) AS total_amount FROM tbl_participants RIGHT JOIN tbl_votes ON tbl_votes.part_id = tbl_participants.id';
	// 		query_where = '';
	// 		if (data.event_id != ''){
	// 			query_where = ' WHERE tbl_votes.event_id = ' + data.event_id;
	// 		}
	//
	// 		query = query + query_where;
	// 		query = query + ' GROUP BY tbl_votes.part_id ORDER BY total_amount DESC LIMIT 5';
	//
	// 		console.log(query);
	// 		connection.query(query, [], (err, rows, fields) => {
	// 			if (err) console.error(err);
	// 			res.jsonp({
	// 				status: 'success',
	// 				message: 'SUCCESSFULLY GOT',
	// 				athletes: rows
	// 			});
	//
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 			athletes: []
	// 		});
	// 	}
	// });
	//
	// router.post('/get_top_fans', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		query = 'SELECT tbl_fans.*, SUM(tbl_votes.vote_amount) AS total_amount FROM tbl_fans RIGHT JOIN tbl_votes ON tbl_votes.fan_id = tbl_fans.id';
	// 		query_where = '';
	// 		if (data.event_id != ''){
	// 			query_where = ' WHERE tbl_votes.event_id = ' + data.event_id;
	// 		}
	//
	// 		query = query + query_where;
	// 		query = query + ' GROUP BY tbl_votes.fan_id ORDER BY total_amount DESC LIMIT 5';
	//
	// 		console.log(query);
	// 		connection.query(query, [], (err, rows, fields) => {
	// 			if (err) console.error(err);
	// 			console.log(rows);
	// 			res.jsonp({
	// 				status: 'success',
	// 				message: 'SUCCESSFULLY GOT',
	// 				fans: rows
	// 			});
	//
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 			fans: []
	// 		});
	// 	}
	// });
	//
	// router.post('/get_selling_request', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		// Connect to MySQL DB
	// 		query = 'SELECT tbl_selling_requests.*, tbl_fans.name as seller FROM tbl_selling_requests LEFT JOIN tbl_fans ON tbl_fans.id = tbl_selling_requests.seller_id WHERE status = "open" AND seller_id != ?';
	// 		connection.query(query, [data.user_id], (err, rows, fields) => {
	// 			if (err) console.error(err);
	// 			console.log(rows);
	// 			res.jsonp({
	// 				status: 'success',
	// 				message: 'SUCCESSFULLY GOT',
	// 				res: rows
	// 			});
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	// router.post('/set_selling_request', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		// Connect to MySQL DB
	// 		var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
	// 		connection.query('INSERT INTO tbl_selling_requests (selling_amount, seller_id, price, status, created_at) VALUES (?, ?, ?, ?, ?)', [data.selling_amount, data.seller_id, data.selling_price, "open", CURRENT_TIMESTAMP], (err, results) => {
	// 			if(err){
	// 				console.error(err);
	// 			} else {
	// 				connection.query('SELECT tbl_selling_requests.*, tbl_fans.* FROM tbl_selling_requests left join tbl_fans on tbl_fans.id = tbl_selling_requests.seller_id WHERE tbl_selling_requests.id=?', [results.insertId], (err, result_requests) => {
	// 					if (err) {
	// 						console.error(err);
	// 						res.jsonp({
	// 							status: 'failed',
	// 							message: 'cannot find request',
	// 							selling_request: []
	// 						});
	// 					} else {
	// 						// seller_address = result_requests[0].wallet_address;
	// 						// seller_private_key = result_requests[0].private_key;
	// 						// amount = result_requests[0].amount;
	// 						// send_token(app_address, amount, seller_private_key);
	// 						res.jsonp({
	// 							status: 'success',
	// 							message: 'SUCCESSFULLY REGISTERED.',
	// 							selling_request: result_requests[0]
	// 						});
	// 					}
	// 				});
	// 			}
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	// router.post('/set_buying_request', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		// Connect to MySQL DB
	// 		console.log('request id', data.request_id);
	// 		var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
	// 		connection.query('SELECT tbl_selling_requests.*, tbl_fans.* FROM tbl_selling_requests left join tbl_fans on tbl_fans.id = tbl_selling_requests.seller_id WHERE tbl_selling_requests.id=?', [data.request_id], (err, result_requests) => {
	// 			if (err) {
	// 				console.error(err);
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'failed to find selling request.',
	// 					res:[]
	// 				});
	// 			} else {
	// 				console.log('tbl_selling_requests', result_requests);
	// 				address = result_requests[0].wallet_address;
	// 				var ethers = require('ethers');
	// 				var providers = ethers.providers;
	// 				var provider = new providers.getDefaultProvider(providers.networks.mainnet);
	// 				tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, provider);
	// 				var callPromise = tokenContract.functions.balanceOf(address);
	// 				callPromise.then(function(result_bal) {
	// 					var trueBal = result_bal.toString(10);
	// 					var n = trueBal * 0.000000000000000001;
	// 					var atyxValue = n.toLocaleString(
	// 						undefined, // use a string like 'en-US' to override browser locale
	// 						{
	// 							minimumFractionDigits: 4
	// 						}
	// 					);
	// 					if (n < result_requests[0].selling_amount){
	// 						res.jsonp({
	// 							status: 'failed',
	// 							message: 'This Sale listing is no longer valid. Please choose another listing.',
	// 							res:[]
	// 						});
	// 					} else {
	// 						provider.getBalance(address).then(function(balance) {
	// 							var etherString = ethers.utils.formatEther(balance);
	// 							console.log('etherString', etherString);
	// 							if (parseFloat(etherString) > 0.00001){
	// 								connection.query('UPDATE tbl_selling_requests SET buyer_id = ?, status = ?, updated_at = ? WHERE id = ?', [data.buyer_id, "closed", CURRENT_TIMESTAMP, data.request_id], (err, results) => {
	// 									if(err){
	// 										console.error(err);
	// 									} else {
	// 										console.log(results);
	// 										connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.buyer_id], (err, rows, fields) => {
	// 											if (err){
	// 												console.log(err);
	// 												res.jsonp({
	// 													status: 'failed',
	// 													message: 'Cannot find buyer',
	// 													res: []
	// 												});
	// 											} else {
	// 												if (rows.length == 1){
	// 													seller_address = result_requests[0].wallet_address;
	// 													seller_private_key = result_requests[0].private_key;
	// 													buyer_private_key = rows[0].private_key;
	// 													buyer_address = rows[0].wallet_address;
	// 													token_amount = result_requests[0].selling_amount;
	// 													eth_amount = result_requests[0].price;
	// 													fee = eth_amount * 2 / 100;
	// 													console.log(seller_address, seller_private_key, buyer_address, buyer_private_key, token_amount, eth_amount, fee);
	// 													send_eth(app_address, fee, buyer_private_key);
	// 													send_eth(seller_address, eth_amount, buyer_private_key);
	// 													send_tokens(buyer_address, token_amount, seller_private_key);
	// 													res.jsonp({
	// 														status: 'success',
	// 														message: 'updated',
	// 														res: []
	// 													});
	// 												} else {
	// 													res.jsonp({
	// 														status: 'failed',
	// 														message: 'Cannot find buyer',
	// 														res: []
	// 													});
	// 												}
	// 											}
	// 										});
	// 									}
	// 								})
	// 							} else {
	// 								res.jsonp({
	// 									status: 'failed',
	// 									message: 'Your seller has not eth balance for sending token to you. Try it later.',
	// 									res:[]
	// 								});
	// 							}
	// 						});
	// 					}
	// 				});
	// 			}
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	// router.post('/submit_vote', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.fan_id], (err, rows, fields) => {
	// 			// Connect to MySQL DB
	// 			if (data.vote_amount != 0){
	// 				address = rows[0].wallet_address;
	// 				var ethers = require('ethers');
	// 				var targetAddress = ethers.utils.getAddress(app_address);
	// 				var amount = ethers.utils.bigNumberify("1000000000000000000").mul(data.vote_amount);
	// 				myWallet = new ethers.Wallet('0x'+rows[0].private_key);
	// 				console.log(rows[0].private_key, data.vote_amount, rows[0].wallet_address, data.fan_id);
	// 				var providers = ethers.providers;
	// 				var provider = ethers.providers.getDefaultProvider(providers.networks.mainnet);
	// 				myWallet.provider = provider;
	// 				tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, myWallet);
	// 				console.log('targetAddress', targetAddress);
	// 				console.log('amount', amount);
	// 				provider.getGasPrice().then(function(gasPrice) {
	// 					console.log('gasPrice', gasPrice);
	// 					tokenContract.functions.transfer(targetAddress, amount, {
	// 						gasPrice: gasPrice,
	// 						gasLimit: 65000,
	// 					}).then(function(txid) {
	// 						var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
	// 						connection.query('INSERT INTO tbl_votes (event_id, fan_id, part_id, vote_amount, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
	// 						[data.event_id, data.fan_id, data.part_id, data.vote_amount, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP],
	// 						(err, results) => {
	// 							if(err){
	// 								console.error(err);
	// 								res.jsonp({
	// 									status: 'failed',
	// 									message: err,
	// 									user: []
	// 								});
	// 							} else {
	// 								res.jsonp({
	// 									status: 'success',
	// 									message: 'SUCCESSFULLY SUBMITTED',
	// 									res:txid
	// 								});
	// 							}
	// 						});
	// 					});
	// 				});
	// 			} else {
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'FAILED SUBMITTED. AMOUNT 0',
	// 					vote: []
	// 				});
	// 			}
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	// router.post('/send_eth_test', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		var ethers = require('ethers');
	// 		var targetAddress = ethers.utils.getAddress(data.target_address);
	// 		myWallet = new ethers.Wallet('0x'+data.private_key);
	// 		var providers = ethers.providers;
	// 		var provider = new providers.getDefaultProvider(providers.networks.mainnet);
	// 		myWallet.provider = provider;
	//
	// 		provider.getGasPrice().then(function(gasPrice) {
	// 			console.log(gasPrice);
	// 			myWallet.send(targetAddress, ethers.utils.bigNumberify(gasPrice).mul(65000), {
	// 				gasPrice: gasPrice,
	// 				gasLimit: 65000,
	// 			}).then(function(txid1, err) {
	// 				console.log(txid1);
	// 				res.jsonp({
	// 					status: 'success',
	// 					message: 'SUCCESSFULLY MADE',
	// 					res:txid1
	// 				});
	// 			});
	// 		});
	// 	}
	// });
	//
	// // router.post('/give_redeem', (req, res) => {
	// // 	var data = req.body; // maybe more carefully assemble this data
	// // 	console.log('api_key', data.api_key);
	// // 	if (data.api_key == API_KEY){
	// // 		var api = 'https://api.blockcypher.com/v1/eth/main/addrs';
	// // 		request.post(api, function (error, response, wallet) {
	// // 			var wallet_data = JSON.parse(wallet);
	// // 			console.log(wallet_data);
	// // 			console.log('private', wallet_data.private);
	// // 			console.log('address', wallet_data.address);
	// // 			var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
	// // 				if (err) console.error(err);
	// // 				console.log('rows', rows.length);
	// // 				if (rows.length == 1){
	// // 					send_eth(wallet_data['address'], 0.000325, rows[0].private_key);
	// // 					address = rows[0].wallet_address;
	// // 					var ethers = require('ethers');
	// // 					var targetAddress = ethers.utils.getAddress(wallet_data['address']);
	// // 					myWallet = new ethers.Wallet('0x'+rows[0].private_key);
	// // 					var providers = ethers.providers;
	// // 					var provider = new providers.getDefaultProvider(providers.networks.mainnet);
	// // 					myWallet.provider = provider;
	// // 					tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, myWallet);
	// //
	// // 					var atha_amount = data.atha_amount * 102 / 100;
	// // 					console.log('atha_amount', atha_amount);
	// // 					var amount = atha_amount;
	// // 					console.log('amount', amount.toString());
	// // 					console.log('eth_amount', data.eth_amount);
	// // 					provider.getGasPrice().then(function(gasPrice) {
	// //
	// // 						console.log('gasPrice', ethers.utils.bigNumberify(gasPrice).toString());
	// // 						tokenContract.functions.redeem(targetAddress, amount, {
	// // 							value: ethers.utils.parseEther(data.eth_amount),
	// // 							gasPrice: gasPrice,
	// // 							gasLimit: 65000,
	// // 						}).then(function(txid, err) {
	// // 							if (!err){
	// // 										var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
	// // 										var redeem_code = makeRedeemCode();
	// // 										connection.query('INSERT INTO mobile_redeems (title, description, redeem_code, redeem_date, target_address, private_key, amount, status, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
	// // 										[ data.title, data.description,redeem_code,CURRENT_TIMESTAMP, wallet_data.address, wallet_data.private, data.atha_amount, 'opened', data.user_id, CURRENT_TIMESTAMP ],
	// // 										(err, results) => {
	// // 											if(err){
	// // 												console.error(err);
	// // 												res.jsonp({
	// // 													status: 'failed',
	// // 													message: 'Database cannot accept it!',
	// // 													res:txid
	// // 												});
	// // 											} else {
	// // 												res.jsonp({
	// // 													status: 'success',
	// // 													message: 'SUCCESSFULLY MADE',
	// // 													res:txid
	// // 												});
	// // 											}
	// // 										});
	// // 							} else {
	// // 								res.jsonp({
	// // 									status: 'failed',
	// // 									message: 'transaction failed',
	// // 									res:err
	// // 								});
	// // 							}
	// // 						})
	// // 						.catch(function(err){
	// // 							console.log(err);
	// // 							res.jsonp({
	// // 								status: 'failed',
	// // 								message: 'Failed in Transfer',
	// // 								res:err
	// // 							});
	// // 							console.log(err);
	// // 						});
	// // 					});
	// // 				} else {
	// // 					res.jsonp({
	// // 						status: 'failed',
	// // 						message: 'incorret user_id'
	// // 					});
	// // 				}
	// // 			});
	// // 		});
	// // 	} else {
	// // 		res.jsonp({
	// // 			status: 'failed',
	// // 			message: 'API KEY IS INVALID',
	// // 		});
	// // 	}
	// // });
	//
	// router.post('/give_redeem', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 			var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
	// 				if (err) console.error(err);
	// 				console.log('rows', rows.length);
	// 				if (rows.length == 1){
	// 					address = rows[0].wallet_address;
	// 					var ethers = require('ethers');
	// 					myWallet = new ethers.Wallet('0x'+rows[0].private_key);
	// 					var providers = ethers.providers;
	// 					var provider = new providers.getDefaultProvider(providers.networks.mainnet);
	// 					myWallet.provider = provider;
	// 					tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, myWallet);
	// 					var atha_amount = data.atha_amount * 102 / 100;
	//
	// 					provider.getGasPrice().then(function(gasPrice) {
	// 						var gas = ethers.utils.bigNumberify(gasPrice).mul(ethers.utils.bigNumberify(65000));
	// 						console.log(gasPrice.toString());
	// 						console.log(gas.toString());
	// 						console.log(data.eth_amount.toString());
	// 						eth_amount = ethers.utils.parseEther(data.eth_amount.toString());
	// 						console.log(eth_amount.toString());
	// 						eth_amount = gas.add(eth_amount);
	// 						console.log('atha', atha_amount, eth_amount.toString());
	// 						tokenContract.functions.redeem_deposit(atha_amount, {
	// 							value: eth_amount,
	// 							gasPrice: gasPrice,
	// 							gasLimit: 110000,
	// 						}).then(function(txid, err) {
	// 							if (!err){
	// 										var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
	// 										var redeem_code = makeRedeemCode();
	// 										console.log(txid);
	// 										connection.query('INSERT INTO mobile_redeems (title, description, redeem_code, redeem_date, target_address, private_key, amount, status, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
	// 										[ data.title, data.description,redeem_code,CURRENT_TIMESTAMP, '', '', data.atha_amount, 'opened', data.user_id, CURRENT_TIMESTAMP ],
	// 										(err, results) => {
	// 											if(err){
	// 												console.error(err);
	// 												res.jsonp({
	// 													status: 'failed',
	// 													message: 'Database cannot accept it!',
	// 													res:txid
	// 												});
	// 											} else {
	// 												res.jsonp({
	// 													status: 'success',
	// 													message: 'SUCCESSFULLY MADE',
	// 													res:txid
	// 												});
	// 											}
	// 										});
	// 							} else {
	// 								res.jsonp({
	// 									status: 'failed',
	// 									message: 'You need more ETH to process this transaction.',
	// 									res:err
	// 								});
	// 							}
	// 						})
	// 						.catch(function(err){
	// 							console.log(err);
	// 							res.jsonp({
	// 								status: 'failed',
	// 								message: 'You need more ETH to process this transaction.',
	// 								res:err
	// 							});
	// 							console.log(err);
	// 						});
	// 					});
	// 				} else {
	// 					res.jsonp({
	// 						status: 'failed',
	// 						message: 'incorret user_id'
	// 					});
	// 				}
	// 			});
	//
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	//
	// router.post('/sent_redeems', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		// Connect to MySQL DB
	// 		connection.query('SELECT * FROM mobile_redeems WHERE created_by=?', [data.user_id], (err, result_requests) => {
	// 			if (err) console.error(err);
	// 			res.jsonp({
	// 				status: 'success',
	// 				message: 'SUCCESSFULLY REGISTERED.',
	// 				res: result_requests
	// 			});
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	// router.post('/received_redeems', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		// Connect to MySQL DB
	// 		connection.query('SELECT * FROM mobile_redeems WHERE received_by=?', [data.user_id], (err, result_requests) => {
	// 			if (err) console.error(err);
	// 			res.jsonp({
	// 				status: 'success',
	// 				message: 'SUCCESSFULLY REGISTERED.',
	// 				res: result_requests
	// 			});
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });
	//
	// router.post('/get_redeem', (req, res) => {
	// 	var data = req.body; // maybe more carefully assemble this data
	// 	console.log('api_key', data.api_key);
	// 	if (data.api_key == API_KEY){
	// 		// Connect to MySQL DB
	// 		connection.query('SELECT * FROM mobile_redeems WHERE redeem_code=? AND status=?', [data.redeem_code, "opened"], (err, result_requests) => {
	// 			if (err) {
	// 				console.error(err);
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'Cannot find the redeem.',
	// 					res: []
	// 				});
	// 				return;
	// 			}
	// 			console.log('result_requests', result_requests);
	// 			if (result_requests.length > 0) {
	// 				var query = connection.query('SELECT * FROM tbl_fans WHERE id=?', [data.user_id], (err, rows, fields) => {
	// 					if (err) {
	// 						console.error(err);
	// 						res.jsonp({
	// 							status: 'failed',
	// 							message: 'cannot find sender',
	// 							res: []
	// 						});
	// 					} else {
	// 						console.log('rows', rows.length);
	// 						if (rows.length == 1){
	// 							address = result_requests[0].target_address;
	// 							var ethers = require('ethers');
	// 							var targetAddress = ethers.utils.getAddress(rows[0].wallet_address);
	// 							myWallet = new ethers.Wallet('0x'+redeemer_key);
	// 							var providers = ethers.providers;
	// 							var provider = ethers.providers.getDefaultProvider(providers.networks.mainnet);
	// 							myWallet.provider = provider;
	// 							tokenContract = new ethers.Contract(ATHA_CONTRACT_ADDRESS, ATHA_ABI, myWallet);
	//
	// 							provider.getBalance(redeemer_address).then(function(balance) {
	// 								var etherString = ethers.utils.formatEther(balance);
	// 								if (parseFloat(etherString) <= 0){
	// 									res.jsonp({
	// 										status: 'failed',
	// 										res: err,
	// 										message: 'Try it later. the Eth balance is not yet loaded there!'
	// 									});
	// 									return;
	// 								}
	// 								provider.getGasPrice().then(function(gasPrice) {
	// 									console.log('gasPrice', gasPrice);
	// 									tokenContract.functions.redeem_withdraw(targetAddress, result_requests[0].amount, {
	// 										value: 0,
	// 										gasPrice: gasPrice,
	// 										gasLimit: 65000,
	// 									}).then(function(txid, err) {
	// 										if (!err){
	// 											var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
	// 											connection.query('UPDATE mobile_redeems SET status = ?, received_by = ?, updated_at = ? WHERE redeem_code=?', ['closed', data.user_id, CURRENT_TIMESTAMP, data.redeem_code], (err, result) => {
	// 												if (!err){
	// 													res.jsonp({
	// 														status: 'success',
	// 														res: result,
	// 														message: 'successfully got redeem',
	// 													});
	// 												}
	// 											});
	// 										} else {
	// 											res.jsonp({
	// 												status: 'failed',
	// 												res: err,
	// 												message: 'transaction failed'
	// 											});
	// 										}
	// 									});
	// 								});
	// 							});
	// 						} else {
	// 							res.jsonp({
	// 								status: 'failed',
	// 								res: [],
	// 								message: 'cannot find sender',
	// 							});
	// 						}
	// 					}
	// 				});
	// 			} else {
	// 				res.jsonp({
	// 					status: 'failed',
	// 					message: 'This redeem code has been redeemed or is no longer valid. Please check your code and try again.',
	// 					res: []
	// 				});
	// 			}
	// 		});
	// 	} else {
	// 		res.jsonp({
	// 			status: 'failed',
	// 			message: 'API KEY IS INVALID',
	// 		});
	// 	}
	// });

	return router;
};
