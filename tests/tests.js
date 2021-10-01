const sinon = require('sinon');
const http = require('http');
// const MockReq = require('mock-req');
// const MockRes = require('mock-res');
const assert = require('assert');
const fs = require('fs');

const userOps = require("../EksiArchive/userOps");
const dbOps = require("../EksiArchive/dbOps");

describe('Web Requests' , () => {
    beforeEach(function() {
        this.request = sinon.stub(http, 'request');
    });

    afterEach(() => {
        http.request.restore();
    });

    it('tests for empty entry id', ()=> {
        const emptyID = '';
        const rejected = Promise.reject("statusCode=301");

        const emptyIdReq = userOps.getEntry(emptyID);

        assert.deepStrictEqual(emptyIdReq, rejected);
    });

    it('tests for non-existent entry', () => {
        const nonExistentID = '54329523423532412';
        const rejected = Promise.reject("statusCode=404");

        const nonExistentReq = userOps.getEntry(nonExistentID);

        assert.deepStrictEqual(nonExistentReq, rejected);
    });

    it('tests for a normal entry', async () => {
        const normalID = '1';
        const typeOfResolved = 'string';

        const normalIDReq = await userOps.getEntry(normalID);
        const typeOfNormal = typeof normalIDReq;

        assert.deepStrictEqual(typeOfNormal, typeOfResolved);
    });
});

describe('SQL Operations', () => {
    it('checks if it can create a database file', ()=> {
        const expectedErr = false;
        const dbFolder = '../';


        fs.access(dbFolder, fs.constants.W_OK, (err) => {
            let actualErr;
            err ? actualErr=true : actualErr=false
            // console.log(`${dbFolder} ${`);
            assert.deepStrictEqual(actualErr, expectedErr);
        });
    });


});

describe('Entry Operations', () => {
   describe('String to Entry', () => {

   })
});