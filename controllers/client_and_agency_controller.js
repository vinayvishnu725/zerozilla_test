const mongoose = require("mongoose")
const AgencySchema = require("../models/Agency");
const ClientSchema = require("../models/Client");
const utils = require("../utils/utils");


exports.createAgencyAndClient =async(req, res)=>{
    try{

        const AgencyDetails = req.body.AgencyDetails;
        const ClientDetails = req.body.ClientDetails;

        const agencyExists = await AgencySchema.findOne({
            AgencyId:AgencyDetails.AgencyId
        })

        const clientExists = await ClientSchema.findOne({
            ClientId:ClientDetails.ClientId
        })

        if(agencyExists || clientExists){
            utils.commonResponce(
                res,
                201,
                "clientId or AgencyId is already exists try with different id"
            )
        }else{
            await AgencySchema.create({
                AgencyId : AgencyDetails.AgencyId,
                AgencyName : AgencyDetails.AgencyName,
                Address1 : AgencyDetails.Address1,
                Address2 : AgencyDetails.Address2,
                State : AgencyDetails.State,
                City : AgencyDetails.City,
                PhoneNumber : AgencyDetails.PhoneNumber,
            }).then(async(AgencyData)=>{
                await ClientSchema.create({
                    ClientId :ClientDetails.ClientId,
                    AgencyId :AgencyDetails.AgencyId,
                    ClientName :ClientDetails.ClientName,
                    Email :ClientDetails.Email,
                    PhoneNumber :ClientDetails.PhoneNumber,
                    TotalBill:ClientDetails.TotalBill
                }).then((ClientData)=>{
                    utils.commonResponce(
                        res,
                        200,
                        "successfully created agency and client",
                        {clientDetails:ClientData,
                        agencyDetails:AgencyData}
                    )
                })
    
                
            })
        }

      

    }catch (error) {
        utils.commonResponce(res, 500, "Unexpected Server Error while creating agency and client", error.toString())
    }
}

exports.updateClient  = async(req, res)=>{
    try{

        const ClientDetails = req.body.ClientDetails;

      const clientExists =   await ClientSchema.findOne({
            ClientId:ClientDetails.ClientId
        });
        // console.log(clientExists)
        if(clientExists){
            await ClientSchema.findOneAndUpdate({
                ClientId:ClientDetails.ClientId
            },{
                ClientName:ClientDetails.ClientName,
                Email:ClientDetails.Email,
                PhoneNumber:ClientDetails.PhoneNumber,
                TotalBill:ClientDetails.TotalBill
            },{
                useFindAndModify: false, new:true
            }).then((data)=>{
                utils.commonResponce(
                    res,
                    200,
                    "client updated successfully",
                    data
                )
            })
        }else{
            utils.commonResponce(
                res,
                201,
                "client with this id does not exists"
            )
        }
       

    } catch (error) {
        utils.commonResponce(res, 500, "Unexpected Server Error while updating client", error.toString())
    }
}

exports.getMaxBillClientAndAgent= async(req, res)=>{
    try{
        const clientData = await ClientSchema.aggregate([
            {
              '$sort': {
                'TotalBill': -1
              }
            }, {
              '$limit': 1
            }, {
              '$lookup': {
                'from': 'agencies', 
                'localField': 'AgencyId', 
                'foreignField': 'AgencyId', 
                'as': 'AgencyDetails'
              }
            }, {
              '$unwind': {
                'path': '$AgencyDetails', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$project': {
                'ClientName': 1, 
                'AgencyName': '$AgencyDetails.AgencyName', 
                'TotalBill': 1
              }
            }
          ])

          if(clientData.length>0){
              utils.commonResponce(
                  res,
                  200,
                  "successfully fetched highest bill client ",
                  clientData[0]
              )
          }else{
              utils.commonResponce(
                  res,
                  201,
                  "no data exists"

              )
          }
    }catch (error) {
        utils.commonResponce(res, 500, "Unexpected Server Error while getting client", error.toString())
    }
}