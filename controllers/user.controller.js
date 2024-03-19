const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const UpdateUser = async (req, res) => {
    try {
        let { password } = req.body; // Change const to let since password will be reassigned
        if (password) {
            const hashpassword = await bcrypt.hash(password, 10);
            req.body.password = hashpassword; // Assign hashed password back to req.body.password
        }
        const UpdatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(201).json({
            message: "User updated successfully",
            UpdatedUser
        });
    } catch (error) {
        return res.status(404).json({
            message: "User cannot be updated"
        });
    }
}


const deleteUserById = async(req,res) =>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(201).json({
            messaage:"user deleted succesfully"
        })
    } catch (error) {
        return res.status(404).json(error)
    }
}


const getUserById = async(req,res)=>{
    try {
        const user  = await userModel.findById(req.params.id);
        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json(error)
    }
}


const getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
        let users;
        if (query) {
            users = await userModel.find().sort({ _id: -1 }).limit(1);
        } else {
            users = await userModel.find();
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json(error);
    }
}

const getUserStatus = async (req, res) => {
    try {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        const data = await userModel.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ]);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error); // Change status to 500 for error response
    }
}



module.exports = { UpdateUser ,deleteUserById ,getUserById,getAllUsers,getUserStatus};
