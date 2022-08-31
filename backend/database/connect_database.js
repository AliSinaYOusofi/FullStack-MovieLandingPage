const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const bcrypt = require("bcryptjs");
const database = require("./database");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;

// express use these
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use("/", router);

// hashsing funcs
function hashPassword(password) { return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); }
function comparePasswordHash(password, hash) { return bcrypt.compareSync(password, hash);}

// user sign up done
app.post("/register", (req, res) => {
    
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = hashPassword(String(req.body.password));
    
    const insertQuery = `INSERT INTO signups(user_name, user_password, user_email) VALUES(?, ?, ?);`;
    // checking email before query

    database.query("SELECT user_email FROM signups WHERE user_email = ?;", [email], (error, result) => {
        if(error) {
            res.send({message: "query Erroro"});
        }
        else if(result.length !== 0) { // don't insert user if exits with the same eamil
            res.send({message: "user present already"});
        }
        else { // insert the new user
            database.query(String(insertQuery), [firstName, hashedPassword, email], (error, result) => {
                
                if (error) {
                    res.send({message: "error while registering user"});
                } else {
                    res.send({message: "success"});
                }
            });
        }
    });
    
});

// handling user logins
// todos: 1 -> get user creds from frontend
// todos: 2 -> check if user exists with the email
// todos: 3 -> hash the password and check with plain password
// todos: 4 -> return sucess on true and failed on false
// done 3:30am
 
app.post("/login",  (req, res) => {

    const login_email = req.body.email;
    const login_password = req.body.password;

    database.query("SELECT user_email, user_password FROM signups WHERE user_email = ?;", [login_email], (error, result) => {
        
        if(error) {
           
            res.send({message: "query Erroro"});
        } else if (result.length === 0) {
            res.send({message: "email not found"});
        } else {
           
            if (comparePasswordHash(login_password, result[0]?.user_password)) {
                const dataToBeSigned = {login_email, login_password}
                const access_token = jwt.sign(dataToBeSigned, "secret");
                res.send({message: "success", token: access_token});
            } else {
                
                res.send({message: 'intruder'});
            }
        }
    });
    
});


app.post("/details", (req, res) => {
    const {token} = req.body;
    jwt.verify(token, "secret", (error, details) => {
        if (error) return res.sendStatus(404);
        const query = "SELECT * FROM signups WHERE user_email = ?";

        database.query(query,[details.login_email], (error, result) => {
            if (error) return res.sendStatus(404);
            return res.send(result[0]);
        })
    });
}); 

app.post("/deleteme", (req, res) => {
    const {email} = req.body;
    // delete this user
    const delete_user_query = "DELETE FROM signups WHERE user_email = ?;";
    database.query(delete_user_query, [email], (error, result) => {
        if (error) return res.send({message: 'failed'});
        return res.send({message: "done"});
    })
})

app.post("/authenticate", (req, res) => {
    let {token, new_username, new_password} = req.body;
    new_password = hashPassword(new_password); 
    jwt.verify(String(token), "secret", (error, user) => {
        if (error) return res.sendStatus(403);
        else {
            const query = "UPDATE signups SET user_name = ?, user_password = ? WHERE user_email = ?;";
            database.query(query, [new_username, new_password, user.login_email], (error, result) => {
                if (error) return res.sendStatus(404);
                return res.send({message: "done"})
            })
        }
    })
})

app.post("/movie_ids", (req, res) => {
    let flag = true;
    const {token, ids} = req.body;
   
    jwt.verify(String(token), "secret", (error, result) => {
          
        if (error) { flag = false}
        else {
            const query = "INSERT INTO favorite_movies(user_email, favorite_id) values(?, ?);";
                database.query(query, [result.login_email, Number(ids)], (errors, noError) => {
                    if (errors) {flag = false}
                });
        }
        flag ? res.send({message: "done"}) : res.send({message: "failed"});
    })
})

app.get("/get_ids", (req, res) => {
    let flag = true;
    let favorite_ids = [];
    const key = req.query.key; // getting query params
    jwt.verify(String(key), "secret", (error, user) => {
        if (error) flag = false;
        database.query("SELECT favorite_id FROM favorite_movies WHERE user_email = ?;", [user.login_email], (err, result) => {
            if (err) flag = false;
            
            result.forEach(item => {
                favorite_ids.unshift(item.favorite_id);
            });

            flag ? res.send({ids: favorite_ids}) : res.send({ids: "none"});
        });
    })
})
app.post("/api/delete_id", (req, res) => {
    let flag = true;
    const movie_id = req.body.movie_id;
    database.query("DELETE FROM favorite_movies WHERE favorite_id = ?", [movie_id], (error, result) => {
        if (error) { flag = false; return}
        flag ? res.send({message: "deleted"}) : res.send({message: "failed"});
        
    })
    
})

function authenticateUser(req, res, next) {
    const authHeader = req.headers['USER-X-TOKEN'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        jwt.verify(token, "secret", (error, user) => {
            if (error) return res.sendStatus(403);
            req.user = user;
        });
    } catch(error) {
        return res.sendStatus("Invalid Token")
    }
    next();
}

app.listen(3001, () => console.log("running"));
