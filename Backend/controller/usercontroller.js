const { User, validate } = require("../model/user");
const bcrypt = require("bcrypt");

async function register (req, res){
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};


async function add(req, res) {
  try {
    console.log("data", req.body);
    const user = new User(req.body);
    await user.save();
    res.status(200).send("add good");
  } catch (err) {
    res.status(400).send({ error: err });
    //console.log();
  }
}
async function getall (req,res){
  try{
      const data = await User.find();
     
      res.status(200).send(data)
      }catch(err){
          res.status(400).send(err);
      }
}

async function getbyid (req,res){
  try{
      const data = await User.findById(req.params.id);
     
      res.status(200).send(data)
      }catch(err){
          res.status(400).send(err);
      }
}

async function getbyname(req,res){
  try{
      let name = req.params.firstname;
      const dataname = await User.findOne({name});
     
      res.status(200).send(dataname)
      }catch(err){
          res.status(400).send( err);
      }
}

async function UpdateUser(req, res){
  try {
     await User.findByIdAndUpdate(req.params.id, req.body);
     res.status(200).send("data updated")

  } catch (err) {
      res.status(400).json(err);
  }
}
async function deleteUser (req, res) {
  try {
     await User.findByIdAndDelete(req.params.id);
     res.status(200).send("User deleted")

  } catch (err) {
      res.status(500).json(err);
  }
}




module.exports = {
  register,
  add,
  getall,
  getbyid,
  getbyname,
  UpdateUser,
  deleteUser,

 
};
