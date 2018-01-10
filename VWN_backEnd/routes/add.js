const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());
const config = JSON.parse(fs.readFileSync('config-secret.json'))
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});

connection.connect();
console.log('connection')
const queryPromise = (queryBody, values) => {
    return new Promise((resolve, reject) => {
        connection.query(queryBody, values, (error, results, fields) => {
            if (error) {
                reject({error});
            }
            else {
                resolve(results);
            }
        });
    });
}
router.post('/add', (req, res) => {
    const data = req.body;
    console.log(data)
    let insertedOrgId;
    queryPromise(`
        INSERT INTO
            org
                (name, description, logo, active, approved)
        VALUES
            (?, ?, ?, ?, ?)
    `, [data.Name, data.Description, data.Logo, 1, 0]).then(results => {
        insertedOrgId = results.insertId;
        return queryPromise(`
            INSERT INTO
                org_has_tag
                    (org_id, tag_id)
            VALUES
                ?
        `, [Object.keys(data.selectedTags).map(tagId => [insertedOrgId, tagId])]);
    }).then(results => {
        const valuesArray = [];
        for (const region in data.selectedRegions){
            const contactData = data.selectedRegions[region]
            console.log(region)
                valuesArray.push([contactData.Phone,
                    data.Email, data.Website, insertedOrgId,
                    contactData.PostCode,
                    contactData.City,
                    contactData.HouseNumber])
        }
        return queryPromise(`
            INSERT INTO
                contact
                    (phone, email, web, org_id, post_code, city, house_number)
            VALUES
                ?
        `, [valuesArray]);
    }).then(results => {
        res.status(200).send();
    }).catch(error => {
        console.log(error)
        res.status(500).send();
    });
});
module.exports = router;