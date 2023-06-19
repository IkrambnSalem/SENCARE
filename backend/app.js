// import express 
const express = require("express");
// import body-parser 
const bodyParser = require("body-parser");
// create an express application
const app = express();
// import mongoose module 
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/senCare');
//import jsonwebtoken 
const jwt = require("jsonwebtoken");
// import bcrypt 
const bcrypt = require("bcrypt");
//import multer module
const multer = require("multer");
//import path module
const path = require("path");
// IMPORT DE NODEMAILER 
const nodemailer = require('nodemailer');
// configure Body parser 
// send JSON reponses
app.use(bodyParser.json())
// get object from request
app.use(bodyParser.urlencoded({ extended: true }));
// .use pour la configuration de l'application 
// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
// import axios 
const axios = require('axios');
// import TWILIO
const twilio = require("twilio");
// const sendinBlueTransport = require('nodemailer-sendinblue-transport');
const User = require("./models/user");
const Request = require("./models/request");
const Vue = require("./models/vues");
const { error, log } = require("console");
const { logWarnings } = require("protractor/built/driverProviders");
app.use('/avatars', express.static(path.join('backend/images')));
app.use('/doc', express.static(path.join('backend/images')));
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf',

}
//  diskstorge c le disk de notre ordinateur 
const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    // ici isValid va retourné true or false est ce que le type est appartient au MiMe TYPE ou pas 
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, 'backend/images')
  },
  // split('').join('-') c adire remplacer l'espace par le tiret - 
  // Date.now() pour eviter avoir des noms
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
      extension;
    cb(null, imgName);

  }

});

const upload = multer({
  storage: storageConfig,
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE[file.mimetype];
    const error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});
// busniness Logic of SingnUp
// le storge config le nom de notre constante et multer detecte le fihier recu et le donne un name et une destination 
// single('img') c a dire c une seule image recu et img est utulisé dans le serivce il faut le mmme nom d'attribut  
app.post("/User/subscription", upload.fields([
  { name: 'img', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]), (req, res) => {
  console.log("here BL :Subscription");
  console.log("here the objct of signup", req.body);
  bcrypt.hash(req.body.password, 8).then((cryptedPassword) => {
    let user = new User({
      userType: req.body.userType,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: cryptedPassword,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      experience: req.body.experience,
      price: req.body.price,
      gender: req.body.gender,
      birthday: req.body.birthday,
      role: req.body.role,
      avatar: req.files.img ? `http://localhost:3000/avatars/${req.files.img[0].filename}` : '',
      pdf: req.files.pdf ? `http://localhost:3000/doc/${req.files.pdf[0].filename}` : '',
      status: (req.body.userType == "assistant") ? "not confirmed" : "confirmed",

    })

    user.save()

      .then((doc) => {
        console.log("here success", doc);
        if (doc) {
          res.json({ message: "added successfully" });
        } else {
          res.json({ message: "ERROR" });
        }
      })
      .catch((error) => {
        console.log("here error", error);
        res.json({ message: "ERROR" });
      });

  })
});

//  busniness Login of Login
app.post("/User/signin", (req, res) => {
  // console.log("here the objct from FE",req.body);
  console.log("here email from FE", req.body.login);
  //   User.findOne({ $or: [{ email: req.body.login }, { phoneNumber: req.body.login }] }) permet de chercher 2 champs en mm temps $
  let findedUser;
  User.findOne({ $or: [{ email: req.body.login }, { phoneNumber: req.body.login }] }).then((doc) => {
    console.log("here doc", doc);
    findedUser = doc;
    if (!doc) {
      res.json({ message: "check your info" }); // ajouter return ici
    } return bcrypt.compare(req.body.password, doc.password).then((pwdResult) => {
      if (!pwdResult) {
        res.json({ message: "check your password" });
      } else {
        const token = jwt.sign({
          email: findedUser.email,
          userId: findedUser._id,
          userRole: findedUser.role,
          userType: findedUser.userType,
        },
          "testing",
          { expiresIn: "60min" });
        let userToSend = {
          id: findedUser._id,
          firstName: findedUser.firstName,
          lastName: findedUser.lastName,
          role: findedUser.role,
          userType: findedUser.userType,
          jwt: token,
          expiresIn: 1800,
        }
        res.json({ message: "Welcome", user: userToSend });
      }
    })


  })

});


app.post('/User/sendinblue', async (req, res) => {
  console.log('here business logic of nodemailer with Sendinblue');

  const recipient = req.body.email;

  try {
    const response = await axios.post('https://api.sendinblue.com/v3/smtp/email', {
      sender: {
        name: 'SENCARE',
        email: 'ikrambennsalem@gmail.com'
      },
      to: [{ email: recipient }],
      subject: 'Reset Password',
      htmlContent: '<p>We noticed that you may have forgotten or need to reset your password. To ensure the security of your account, we kindly request that you follow the password reset process by clicking on the <a href="http://localhost:4200/reset-confirmpassword">link provided in the email</a>. This will enable you to create a new password and regain access to your account. If you did not initiate this request, please ignore this email and contact our support team immediately.</p>'

    }, {
      headers: {
        'api-key': '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'
      }
    });

    console.log('Message sent: %s', response.data.messageId);
    res.json({ message: 'Password reset link sent to your email address' });
  } catch (error) {
    console.error(error.response.data);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});


// Réinitialiser le mot de passe de l'utilisateur
app.post('/User/confirmPassword', (req, res) => {
  const uid = req.body.uid;
  const token = req.body.token;
  const password1 = req.body.password;


  const password2 = req.body.newPassword;

  if (password1 !== password2) {
    res.status(400).json({ message: 'Les deux mots de passe ne correspondent pas' });
  } else {
    // Réinitialiser le mot de passe de l'utilisateur
    res.json({ message: 'Le mot de passe a été réinitialisé avec succès' });
  }
  
});


// Business Logic of get all assistants 
app.get("/User", (req, res) => {
  console.log("here the busniness logic of get all assistants");
  User.find({ userType: "assistant" }).then((data) => {
    res.json({ assistants: data });
  });
})

// Business Logic of get all users 
app.get("/User/users", (req, res) => {
  console.log("here the busniness logic of get all users");
  User.find({ userType: "user" }).then((data) => {
    res.json({ users: data });
  });
})

// business Logic of get Assistant by ID 
app.get("/User/:id", (req, res) => {
  let idAss = req.params.id;
  console.log("here id from FE", idAss);
  User.findOne({ _id: idAss }).then((data) => {
    console.log("here data", data);
    res.json({ assistant: data })
  })
})
// business Logic of get User by ID 
app.get("/User/user/:id", (req, res) => {
  let idUser = req.params.id;
  console.log("here id from FE", idUser);
  User.findOne({ _id: idUser }).then((data) => {
    console.log("here data", data);
    res.json({ user: data })
  })
})
// business Logic de EditUser 
app.put("/User", (req, res) => {
  console.log("here busniness logic of edit user");
  let newobj = req.body;
  console.log("newobj", newobj);
  User.updateOne({ _id: newobj._id }, newobj).then((editResponse) => {
    console.log("editResponse", editResponse);
    if (editResponse.modifiedCount == 1) {
      res.json({ message: "all is changed with success" });
    }
  })
})

// business Logic de Edit Assistant 
app.put("/User/Assistant", (req, res) => {
  let newAssistant = req.body;
  User.updateOne({ _id: newAssistant._id }, newAssistant).then((editResponse) => {
    if (editResponse.modifiedCount == 1) {
      res.json({ message: "the assistant was edited with success" });
    }
  })
})

// business Logic of delete Assistant dashboard 
app.delete("/User/deleteAss/:id", (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;
  User.deleteOne({ _id: id }).then((deleteResponse) => {
    if (deleteResponse.deletedCount == 1) {
      res.json({ message: "the object was deleted with success" });
    }
  })
})
// business Logic of delete User dashboard
app.delete("/User/:id", (req, res) => {
  let idUs = req.params.id;
  User.deleteOne({ _id: idUs }).then((deleteResponse) => {
    if (deleteResponse.deletedCount == 1) {
      res.json({ message: "the user was deleted with success" });
    }
  })
})

// business Logic of reset Confirm Password 
app.post("/User/confirmPassword", (req, res) => {
  let Client = req.body;
  User.findById(Client._id)
    .then((user) => {
      if (!user) {
        return console.log("User not found");
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((pwdResult) => {
      console.log("pwdResult", pwdResult);
      if (!pwdResult) {
        return res.json({ message: "Incorrect password" });
      }
      bcrypt.hash(req.body.newPassword, 8, (err, hashedPassword) => {
        if (err) {
          console.log(err);
          return res.json({ message: "Error hashing password" });
        }
        User.updateOne(
          { _id: Client._id },
          { password: hashedPassword }
        ).then((editResponse) => {
          console.log("editResponse", editResponse);
          res.json({ data: editResponse, message: "all is ok" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Error resetting password" });
    });
});

// business logic of contact Assistant by user 
app.post("/User/contactAss/:id", async (req, res) => {
  console.log("here business logic of contact assistant");
  let msg = req.body;
  let idAssistant = req.params.id;
  console.log("msg", msg);
  try {
    const assistant = await User.findById(idAssistant);
    if (!assistant) {
      return res.status(404).json({ error: 'Assistant not found' });
    }
    const response = await axios.post('https://api.sendinblue.com/v3/smtp/email', {
      sender: {
        name: 'SENCARE',
        email: 'ikrambennsalem@gmail.com'
      },
      to: [{ email: msg.email }],
      subject: 'Request for elderly care assistance',
      htmlContent: `${req.body.message}`

    }, {
      headers: {
        'api-key': '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'
      }
    });

    console.log('Message sent: %s', response.data.messageId);
    const request = new Request({
      UserName: msg.firstName,
      idUser: msg._id,
      emailUser: msg.email,
      telUser: msg.phoneNumber,
      message: msg.message,
      assistantId: idAssistant,
      assistantName: assistant.firstName,
      assistantEmail: assistant.email,
      assistantphone: assistant.phoneNumber,
      createdDate: new Date(),
    })
    await request.save();
    console.log("here request", request);
    res.json({ message: "Request sent successfully" });
  }
  catch (error) {
    if (error.response) {
      console.error(error.response.data);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    }
  }
})


// business Logic of get all Requests 
app.get("/Request", (req, res) => {
  console.log("here business logic of get all requests");
  Request.find().then((data) => {
    console.log("here data", data);
    res.json({ requests: data });
  })
})



// Business logic pour acceptation de demande 

const apiKey = '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';
app.put("/Request/:id", async (req, res) => {
  console.log("here id fom FE", req.params.id);
  const id = req.params.id;

  try {
    // Find request by id
    const findedRequest = await Request.findOne({ _id: id });

    // Send email to user
    const response = await axios.post('https://api.sendinblue.com/v3/smtp/email', {
      sender: {
        name: 'SENCARE',
        email: 'ikrambennsalem@gmail.com'
      },
      to: [{ email: findedRequest.emailUser }],
      subject: 'Response of Request',
      htmlContent: 'Your request has been accepted. Thank you for trusting us.'
    }, {
      headers: {
        'api-key': apiKey
      }
    });

    if (response && response.data && response.data.messageId) {
      console.log('Email sent: %s', response.data.messageId);
    } else {
      console.log('Error sending email:', response);
    }
    console.log("here teluser", findedRequest.telUser);
    // Send Twilio message to user
    // Update request and user with response
    console.log("findedRequest", findedRequest);
    if (findedRequest) {
      await Request.findOneAndUpdate({ _id: id }, { response: 'accepted' });
      findedRequest.response = 'accepted';
      findedRequest.assistantResponse = 'accepted';
      await findedRequest.save();

      const user = await User.findOne({ _id: findedRequest.idUser });
      user.response = 'accepted';
      user.assistantResponse = 'accepted';
      await user.save();
      const assistant = await User.findOne({ _id: findedRequest.assistantId });

      // Update the assistant's response
      assistant.responseASS = 'accepted the request';
      await assistant.save();

    }
    const accountSid = 'AC252af276fd873ed86edca0e67b507450';
    const authToken = '618be55f22778d9f5dfb299c1d5e3a77';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: 'Votre demande a été acceptée. Merci de nous faire confiance.',
        from: '+16073897378',
        to: '+216' + findedRequest.telUser,
      })
      .then(message => {
        console.log("message.sid", message.sid);
        console.log('SMS sent: %s', message.sid);
        res.json({ message: 'La demande a été acceptée avec succès.' });
      });
    // Update request with assistant ID
    findedRequest.assistantId = req.body.assistantId;
    await findedRequest.save();
  } catch (error) {
    console.error(error.response);
    res.status(500).json({ error: 'An error occurred while sending the confirmation email and SMS.' });
  }
});
// BUSINESS LOGIC OF ACCEPTED REQUEST


// Business Logic of refus of Request 

app.put("/Requestrefused/:id", async (req, res) => {
  console.log("here id fom FE of refus", req.params.id);
  const id = req.params.id;

  try {
    // Find request by id
    const findedRequest = await Request.findOne({ _id: id });

    // Send email to user
    const response = await axios.post('https://api.sendinblue.com/v3/smtp/email', {
      sender: {
        name: 'SENCARE',
        email: 'ikrambennsalem@gmail.com'
      },
      to: [{ email: findedRequest.emailUser }],
      subject: 'Response of Request',
      htmlContent: 'Unfortunately, your request has been declined. We apologize for any inconvenience caused.'
    }, {
      headers: {
        'api-key': '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'
      }

    });

    if (response && response.data && response.data.messageId) {

      console.log('Email sent: %s', response.data.messageId);

    } else {
      console.log('Error sending email:', response);
    }
    console.log("here teluser", findedRequest.telUser);
    // Send Twilio message to user
    // Update request and user with response
    if (findedRequest) {
      await Request.findOneAndUpdate({ _id: id }, { response: 'declined' });
      findedRequest.response = 'declined';
      findedRequest.assistantResponse = 'declined';
      await findedRequest.save();

      const user = await User.findOne({ _id: findedRequest.idUser });
      user.response = 'declined';
      user.assistantResponse = 'declined';
      await user.save();
      const assistant = await User.findOne({ _id: findedRequest.assistantId });

      // Update the assistant's response
      assistant.responseASS = 'Refused the request';
      await assistant.save();
    }

    const accountSid = 'AC252af276fd873ed86edca0e67b507450';
    const authToken = '618be55f22778d9f5dfb299c1d5e3a77';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: 'Unfortunately, your request has been declined. We apologize for any inconvenience caused.',
        from: '+16073897378',
        to: '+216' + findedRequest.telUser,
      })
      .then(message => {

        console.log("message.sid", message.sid);
        console.log('SMS sent: %s', message.sid);

        res.json({ message: 'La demande a été refusée  avec succès.' });
      });

  } catch (error) {
    console.error(error.response);
    res.status(500).json({ error: 'An error occurred while sending the confirmation email and SMS.' });
  }
});



// Business Logic of change password by profile 
app.put("/User/profilePassword", async (req, res) => {
  console.log("here business logic of profile password");
  let newprofile = req.body;
  try {
    const user = await User.findById(newprofile._id);
    console.log("here the searched object", user);
    const pwdResult = await bcrypt.compare(newprofile.oldPassword, user.password);
    console.log("here pwdResult", pwdResult);
    if (!pwdResult) {
      res.json({ message: "Incorrect password" })
      return;
    }
    const passwordHasshed = await bcrypt.hash(newprofile.newPassword, 8);
    const editResponse = await User.updateOne({ _id: newprofile._id }, { password: passwordHasshed });
    console.log("editResponse", editResponse);
    res.json({ data: editResponse, message: "all is ok" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error updating password" });
  }
});

// Update user profile with avatar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/images');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    cb(null, fileName + '-' + Date.now() + '.' + extension);
  }
});

app.put("/User/editPorifle", multer({ storage: storage }).single('avatar'), (req, res) => {
  console.log("here business logic of edit profile");
  let newobj = req.body;
  console.log("newobj", newobj);
  if (req.file) {
    console.log("here req.file", req.file);
    newobj.avatar = `http://localhost:3000/avatars/${req.file.filename}` // dossier 'avatars' 
  }
  User.updateOne({ _id: newobj._id }, newobj).then((editResponse) => {
    console.log("editResponse", editResponse);
    if (editResponse.modifiedCount == 1) {
      res.json({ message: "all is changed with success" });
    }
  });
});

// business logic of get requets by id de assistant 
app.get("/Request/:id", (req, res) => {
  console.log("here business logic of get requests by id");
  let id = req.params.id;
  console.log("id", id);
  Request.find({ assistantId: id }).then((data) => {
    res.json({ requests: data });
    console.log("requests", data);
  })
})


// business logic of get requets by id de user 
app.get("/Request/requestUser/:id", (req, res) => {
  console.log("here business logic of get requests by id");
  let id = req.params.id;
  console.log("id", id);
  Request.find({ idUser: id }).then((data) => {
    res.json({ requests: data });
    console.log("requests", data);
  })
})

// BUSINESS LOGIC OF CONFIRM ASSISTANt
app.put("/User/confirmed/:id", async (req, res) => {
  console.log("here business logic fo confirmed ASSISTANT");
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    user.status = "confirmed";
    await user.save();
    res.json({ message: "Assistant confirmed successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error confirming user");
  }
});

// business logic of search obj 
app.get("/User/search/:term", (req, res) => {
  console.log("here business logic of search");
  let term = req.params.term;
  console.log("term", term);
  User.find({ firstName: term ,userType: "assistant"}).then((data) => {
    console.log("data", data);
    res.json({ user: data })
  })
});

// business logic of search Gender 
app.get("/User/Gender/:term", (req, res) => {
  console.log("here business logic of search");
  let term = req.params.term;
  console.log("term", term);
  User.find({ gender: term ,userType: "assistant" }).then((data) => {
    console.log("data", data);
    res.json({ users: data })
  })
});

// business logic for vues 
app.post('/Vue', async (req, res) => {
  try {
    const vue = new Vue();
    await vue.save();
    res.json({ message: 'Vue enregistrée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



app.get("/Vue", (req, res) => {
  console.log("here business logic of get vues");
  Vue.countDocuments().then((count) => {
    console.log("count", count);
    res.json({ count });
  });
});

// business logic of gett all client 
app.get("/User/allClients", (req, res) => {
  console.log("here business logic of get all client");
  User.find().then((data) => {
    console.log("here data", data);
    res.json({ allClients: data });
  })
})

// business logic of get all requests with response accepted
app.get("/RequestresponRequest", (req, res) => {
  console.log("here business logic of get all request with response accepted"); // ajout du message de console
  Request.find({ assistantResponse: "accepted" }).then((data) => {
    console.log("data", data);
    res.json({ responseReq: data });
  })
})

// business logic de connected User with Gmail 
app.post('/Gmail', (req, res) => {
  console.log("here business logic of connected with gmail");
  const userProfile = req.body;
  const newUser = new User({
    userType: "user",
    firstName: userProfile.given_name,
    lastName: userProfile.family_name,
    email: userProfile.email,
    phoneNumber: userProfile.phoneNumber,
    address: userProfile.address,
    experience: userProfile.experience,
    price: userProfile.price,
    gender: userProfile.gender,
    birthday: userProfile.birthday,
    role: userProfile.role,
    avatar: userProfile.picture,
    pdf: userProfile.pdf,
    status: (userProfile.userType == "assistant") ? "not confirmed" : "confirmed"
  });

  // Enregistrez le nouvel utilisateur dans la collection User
  newUser.save()
    .then(savedUser => {
      // Le nouvel utilisateur a été enregistré avec succès dans la base de données
      console.log('Le nouvel utilisateur a été enregistré avec succès dans la base de données : ', savedUser);
      res.json(savedUser);
    })
    .catch(error => {
      // Une erreur s'est produite lors de l'enregistrement du nouvel utilisateur dans la base de données
      console.error('Une erreur s\'est produite lors de l\'enregistrement du nouvel utilisateur dans la base de données : ', error);
      res.status(500).json({ error: error.message });
    });

});





module.exports = app;