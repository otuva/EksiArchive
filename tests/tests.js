const sinon = require('sinon');
const http = require('http');
// const MockReq = require('mock-req');
// const MockRes = require('mock-res');
const assert = require('assert');
const fs = require('fs');

const userOps = require("../EksiArchive/userOps");
const dbOps = require("../EksiArchive/dbOps");
const formatOps = require("../EksiArchive/formatOps");
const htmlStrings = require("./utils/htmlStrings");

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

        const emptyIdReq = userOps.requestEntry(emptyID);

        assert.deepStrictEqual(emptyIdReq, rejected);
    });

    it('tests for non-existent entry', () => {
        const nonExistentID = '54329523423532412';
        const rejected = Promise.reject("statusCode=404");

        const nonExistentReq = userOps.requestEntry(nonExistentID);

        assert.deepStrictEqual(nonExistentReq, rejected);
    });

    it('tests for a normal entry', async () => {
        const normalID = '1';
        const typeOfResolved = 'string';

        const normalIDReq = await userOps.requestEntry(normalID);
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
       it('tests for empty string', () => {
           assert.throws(() => formatOps.html2entry(""), Error, "html can't be empty");
       });

       it('tests for null object', () => {
           assert.throws(() => {formatOps.html2entry(null)}, Error);
       });

       it('tests for not modified entry', () => {
          const html = htmlStrings.notModified;
          const expectedObj = {
              id: '22016689',
              author: 'meganeura monyi',
              content: '"gelenin gideni aratmadığı tek yer victoria secret defilesidir"',
              inEksiSeyler: false,
              favCount: '172',
              dateCreated: '07.02.2011',
              timeCreated: '18:30',
              dateModified: null,
              timeModified: null
          }

          const actualObj = formatOps.html2entry(html);

          assert.deepStrictEqual(actualObj, expectedObj);
       });

       it('tests for only change in time section of an entry', () => {
           const html = htmlStrings.timeModified;
           const expectedObj = {
               id: '21689654',
               author: 'ralves',
               content: '-iyiydik lan!<br/><br/>(bkz: <a class="b" href="/?q=umut+sar%c4%b1kaya">umut sarıkaya</a>)',
               inEksiSeyler: false,
               favCount: '236',
               dateCreated: '17.01.2011',
               timeCreated: '22:03',
               dateModified: null,
               timeModified: '22:04'
           };

           const actualObj = formatOps.html2entry(html);

           assert.deepStrictEqual(actualObj, expectedObj);
       });

       it('tests for an entry that has modification date and time', () => {
           const html = htmlStrings.dateTimeModified;
           const expectedObj = {
               id: '48398119',
               author: 'hayri ozben',
               content: 'nasa tarafından, hubble uzay teleskobu kullanılarak çekilen fotoğraftır. galaksinin başlığı altında verilmiş olsa da, çok güzel olduğu için başlık açmak istedim. <br/><br/>dünyadan bir kaç dakika uzaklaşmak isteyenler <a rel="nofollow noopener" class="url" target="_blank" href="http://www.spacetelescope.org/images/heic1502a/zoomable/" title="http://www.spacetelescope.org/images/heic1502a/zoomable/">için</a> ...<br/><br/>edit: bu konulara ilgi duyanların katılabileceği bir coursera çevrimiçi <a rel="nofollow noopener" class="url" target="_blank" href="https://www.coursera.org/course/cosmo?action=enroll&amp;sessionId=974479" title="https://www.coursera.org/course/cosmo?action=enroll&amp;sessionId=974479">kursu</a>',
               inEksiSeyler: false,
               favCount: '1014',
               dateCreated: '13.01.2015',
               timeCreated: '23:43',
               dateModified: '14.01.2015',
               timeModified: '13:43'
           }

           const actualObj = formatOps.html2entry(html);

           assert.deepStrictEqual(actualObj, expectedObj);
       });

       it('tests for an entry in eksiseyler', () => {
           const html = htmlStrings.eksiSeylerEntry;
           const expectedSeyler = true;

           const actualObj = formatOps.html2entry(html);

           assert.deepStrictEqual(actualObj.inEksiSeyler, expectedSeyler);
       });
   });
});