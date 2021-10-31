// const sinon = require('sinon');
// const http = require('http');
// const MockReq = require('mock-req');
// const MockRes = require('mock-res');
const assert = require('assert');
const fs = require('fs');

// const userOps = require("../EksiArchive/src/user/user");
// const dbOps = require("../EksiArchive/dbOps");
// const formatOps = require("../EksiArchive/src/");
const entryFormatter = require("../EksiArchive/src/entry/formatEntry");
const htmlStrings = require("./utils/htmlStrings");
const inputValidate = require("../EksiArchive/src/utils/inputValidate");
const groupBy = require("../EksiArchive/src/utils/generalHelpers").groupBy;

describe('Web Requests' , () => {
    // beforeEach(function() {
    //     this.request = sinon.stub(http, 'request');
    // });
    //
    // afterEach(() => {
    //     http.request.restore();
    // });

    // it('tests for empty entry id', ()=> {
    //     const emptyID = '';
    //     const rejected = Promise.reject("statusCode=301");
    //
    //     const emptyIdReq = entryFormatter.requestEntry(emptyID);
    //
    //     assert.deepStrictEqual(emptyIdReq, rejected);
    // });

    // it('tests for non-existent entry', () => {
    //     const nonExistentID = '54329523423532412';
    //     const rejected = Promise.reject("statusCode=404");
    //
    //     const nonExistentReq = userOps.requestEntry(nonExistentID);
    //
    //     assert.deepStrictEqual(nonExistentReq, rejected);
    // });

    // it('tests for a normal entry', async () => {
    //     const normalID = '1';
    //     const typeOfResolved = 'string';
    //
    //     const normalIDReq = await userOps.requestEntry(normalID);
    //     const typeOfNormal = typeof normalIDReq;
    //
    //     assert.deepStrictEqual(typeOfNormal, typeOfResolved);
    // });
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

    it('checks the schema', ()=> {

    });
});

describe('Entry Operations', () => {
   describe('String to Entry', () => {
       it('tests for empty string', () => {
           assert.throws(() => entryFormatter.html2entry(""), Error, "html can't be empty");
       });

       it('tests for null object', () => {
           assert.throws(() => {entryFormatter.html2entry(null)}, Error);
       });

       it('tests for not modified entry', () => {
          const html = htmlStrings.notModified;
          const expectedObj = {
              id: '22016689',
              title: 'yaran facebook durum güncellemeleri',
              author: 'meganeura monyi',
              content: '"gelenin gideni aratmadığı tek yer victoria secret defilesidir"',
              inEksiSeyler: false,
              favCount: '172',
              dateCreated: '07.02.2011',
              timeCreated: '18:30',
              dateModified: null,
              timeModified: null
          }


           const actualObj = entryFormatter.html2entry(html);

          assert.deepStrictEqual(actualObj, expectedObj);
       });

       it('tests for only change in time section of an entry', () => {
           const html = htmlStrings.timeModified;
           const expectedObj = {
               id: '21689654',
               title: 'eski sevgiliye söylemek istenen şeyler',
               author: 'ralves',
               content: '-iyiydik lan!<br/><br/>(bkz: <a class="b" href="/?q=umut+sar%c4%b1kaya">umut sarıkaya</a>)',
               inEksiSeyler: false,
               favCount: '236',
               dateCreated: '17.01.2011',
               timeCreated: '22:03',
               dateModified: null,
               timeModified: '22:04'
           }

           const actualObj = entryFormatter.html2entry(html);

           assert.deepStrictEqual(actualObj, expectedObj);
       });

       it('tests for an entry that has modification date and time', () => {
           const html = htmlStrings.dateTimeModified;
           const expectedObj = {
               id: '48398119',
               title: 'andromeda galaksisinin 1.5 milyar piksellik fotosu',
               author: 'hayri ozben',
               content: 'nasa tarafından, hubble uzay teleskobu kullanılarak çekilen fotoğraftır. galaksinin başlığı altında verilmiş olsa da, çok güzel olduğu için başlık açmak istedim. <br/><br/>dünyadan bir kaç dakika uzaklaşmak isteyenler <a rel="nofollow noopener" class="url" target="_blank" href="http://www.spacetelescope.org/images/heic1502a/zoomable/" title="http://www.spacetelescope.org/images/heic1502a/zoomable/">için</a> ...<br/><br/>edit: bu konulara ilgi duyanların katılabileceği bir coursera çevrimiçi <a rel="nofollow noopener" class="url" target="_blank" href="https://www.coursera.org/course/cosmo?action=enroll&amp;sessionId=974479" title="https://www.coursera.org/course/cosmo?action=enroll&amp;sessionId=974479">kursu</a>',
               inEksiSeyler: false,
               favCount: '1014',
               dateCreated: '13.01.2015',
               timeCreated: '23:43',
               dateModified: '14.01.2015',
               timeModified: '13:43'
           }

           const actualObj = entryFormatter.html2entry(html);

           assert.deepStrictEqual(actualObj, expectedObj);
       });

       it('tests for an entry in eksiseyler', () => {
           const html = htmlStrings.eksiSeylerEntry;
           const expectedSeyler = true;

           const actualObj = entryFormatter.html2entry(html);

           assert.deepStrictEqual(actualObj.inEksiSeyler, expectedSeyler);
       });
   });

   describe('Date Time Formatting', ()=> {
       it('tries only creation date time', ()=> {
           const dateTime = '12.09.2016 10:32';
           const expectedArr = ['12.09.2016', '10:32', null, null];

           const actualArr = entryFormatter.dateTimeFormatter(dateTime);

           assert.deepStrictEqual(actualArr, expectedArr);
       });

       it('tests creation date & time with modification time', ()=> {
           const dateTime = '13.10.2011 14:16 ~ 14:20';
           const expectedArr = ['13.10.2011', '14:16', null, '14:20'];

           const actualArr = entryFormatter.dateTimeFormatter(dateTime);

           assert.deepStrictEqual(actualArr, expectedArr);
       });

       it('tests for creation & modification date time', ()=> {
           const dateTime = '17.10.2016 12:44 ~ 21.12.2018 08:37';
           const expectedArr = ['17.10.2016', '12:44', '21.12.2018', '08:37'];

           const actualArr = entryFormatter.dateTimeFormatter(dateTime);

           assert.deepStrictEqual(actualArr, expectedArr);
       });

   });

   describe('Entry Content Formatting', ()=> {
       it('tests for escaping apostrophes (for sql insertion)', ()=> {
           const string = "he doesn't work for me";
           const expectedString = "he doesn''t work for me";

           const actualString = entryFormatter.contentFormatter(string);

           assert.deepStrictEqual(actualString, expectedString);
       });
   });
});

describe('Input Validate', ()=>{
    describe('entry flag', ()=> {
        it('tests entry input link', ()=>{
            const link = 'https://eksisozluk.com/entry/128511324';
            const expected = '128511324';

            const actual = inputValidate.isInputEntryLink(link);

            assert.deepStrictEqual(actual, expected);
        });

        it('tests for entry id string', ()=>{
            const id = '128511324';
            const expected = '128511324';

            const actual = inputValidate.isInputEntryLink(id);

            assert.deepStrictEqual(actual, expected);
        });
    });

    describe('user page flag', ()=> {
        describe('single value - user', ()=> {
            it('validates eligible input', ()=>{
                const testValue = 'ssg';
                const expected = true;

                const actual = inputValidate.isUserPageValid(testValue);

                assert.deepStrictEqual(actual, expected);
            });

            it('tries empty string', ()=>{
                const testValue = '';
                const expected = false;

                const actual = inputValidate.isUserPageValid(testValue);

                assert.deepStrictEqual(actual, expected);
            });

            it('validates not suitable input', ()=>{
                const testValue = 'ssg%#@';
                const expected = false;

                const actual = inputValidate.isUserPageValid(testValue);

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('comma seperated values - user & page', ()=>{
            it('tests for valid separator',()=> {
                const flagStr = 'user,12';
                const expected = true;

                const actual = inputValidate.isUserPageValid(flagStr);

                assert.deepStrictEqual(actual, expected);
            });

            it('tests for invalid separator',()=> {
                const flagStr = 'user/12';
                const expected = false;

                const actual = inputValidate.isUserPageValid(flagStr);

                assert.deepStrictEqual(actual, expected);
            });

            it('tests for invalid username',()=> {
                const flagStr = 'user%$2,12';
                const expected = false;

                const actual = inputValidate.isUserPageValid(flagStr);

                assert.deepStrictEqual(actual, expected);
            });

            it('tests for invalid page number',()=> {
                const flagStr = 'user,12fsa';
                const expected = false;

                const actual = inputValidate.isUserPageValid(flagStr);

                assert.deepStrictEqual(actual, expected);
            });

            it('tests for space separated username',()=> {
                const flagStr = 'player one,12';
                const expected = true;

                const actual = inputValidate.isUserPageValid(flagStr);

                assert.deepStrictEqual(actual, expected);
            });

            it('tests for hyphen separated username',()=> {
                const flagStr = 'player-one,12';
                const expected = true;

                const actual = inputValidate.isUserPageValid(flagStr);

                assert.deepStrictEqual(actual, expected);
            });

            it('validates comma seperated empty page', ()=>{
                const testValue = 'ssg,';
                const expected = false;

                const actual = inputValidate.isUserPageValid(testValue);

                assert.deepStrictEqual(actual, expected);
            });

            it('validates comma seperated empty user', ()=>{
                const testValue = ',53';
                const expected = false;

                const actual = inputValidate.isUserPageValid(testValue);

                assert.deepStrictEqual(actual, expected);
            });
        });
    });
});

describe('groupBy', ()=>{
    it('tests N=7',()=>{
        const testArray = ['a','b','c','d','e','g','h','a','b','c','d','e','g','h'];
        const expected = {
            0: ['a','b','c','d','e','g','h'],
            1: ['a','b','c','d','e','g','h']
        };

        const actual = groupBy(testArray, 7);

        assert.deepStrictEqual(actual, expected);
    });

    it('tests N=5',()=>{
        const testArray = ['a','b','c','d','e','g','h','a','b','c','d','e','g','h'];
        const expected = {
            0: ['a','b','c','d','e'],
            1: ['g','h','a','b','c'],
            2: ['d','e','g','h']
        };

        const actual = groupBy(testArray, 5);

        assert.deepStrictEqual(actual, expected);
    });

    it('tests N=9',()=>{
        const testArray = ['a','b','c','c','d','e','g','d','e','g','h','a','b','h'];
        const expected = {
            0: ['a','b','c','c','d','e','g','d','e'],
            1: ['g','h','a','b','h']
        };

        const actual = groupBy(testArray, 9);

        assert.deepStrictEqual(actual, expected);
    });

    it('tests N=2',()=>{
        const testArray = ['a','b','c','c'];
        const expected = {
            0: ['a','b'],
            1: ['c','c']
        };

        const actual = groupBy(testArray, 2);

        assert.deepStrictEqual(actual, expected);
    });

    it('tests for fifty element array with N=5', ()=> {
        const testArray = [
            '129055258', '129044078', '129042284', '129021120', '129017068',
            '128999161', '128993875', '128984642', '128984306', '128976144',
            '128951623', '128949030', '128938365', '128937039', '128922172',
            '128888711', '128888014', '128886017', '128859973', '128858300',
            '128852779', '128820609', '128818522', '128817116', '128814436',
            '128814165', '128797374', '128795725', '128784867', '128779419',
            '128761212', '128757198', '128752131', '128720381', '128717576',
            '128691596', '128685687', '128680972', '128680360', '128667811',
            '128638375', '128592579', '128583021', '128559206', '128552326',
            '128549225', '128548171', '128513996', '128511272', '128510448'
        ]

        const expected = {
            '0': [ '129055258', '129044078', '129042284', '129021120', '129017068' ],
            '1': [ '128999161', '128993875', '128984642', '128984306', '128976144' ],
            '2': [ '128951623', '128949030', '128938365', '128937039', '128922172' ],
            '3': [ '128888711', '128888014', '128886017', '128859973', '128858300' ],
            '4': [ '128852779', '128820609', '128818522', '128817116', '128814436' ],
            '5': [ '128814165', '128797374', '128795725', '128784867', '128779419' ],
            '6': [ '128761212', '128757198', '128752131', '128720381', '128717576' ],
            '7': [ '128691596', '128685687', '128680972', '128680360', '128667811' ],
            '8': [ '128638375', '128592579', '128583021', '128559206', '128552326' ],
            '9': [ '128549225', '128548171', '128513996', '128511272', '128510448' ]
        }

        const actual = groupBy(testArray, 5);

        assert.deepStrictEqual(actual, expected);
    });

    it('tests for a hundred element array with N=5', ()=> {
        const testArray = [69,23,56,21,17,23,13,55,30,27,81,1,76,54,31,19,53,5,95,94,39,68,41,76,72,63,81,63,4,81,35,50,27,42,52,34,84,94,66,39,3,18,76,94,67,87,79,20,10,8,32,77,92,88,11,22,91,81,80,37,35,94,1,74,31,3,70,7,2,88,25,75,21,94,88,52,86,46,28,15,21,8,44,99,92,64,13,27,30,97,36,26,13,74,18,23,59,88,70,98]
        const expected = {
            0: [69,23,56,21,17],
            1: [23,13,55,30,27],
            2: [81,1,76,54,31],
            3: [19,53,5,95,94],
            4: [39,68,41,76,72],
            5: [63,81,63,4,81],
            6: [35,50,27,42,52],
            7: [34,84,94,66,39],
            8: [3,18,76,94,67],
            9: [87,79,20,10,8],
            10: [32,77,92,88,11],
            11: [22,91,81,80,37],
            12: [35,94,1,74,31],
            13: [3,70,7,2,88],
            14: [25,75,21,94,88],
            15: [52,86,46,28,15],
            16: [21,8,44,99,92],
            17: [64,13,27,30,97],
            18:[36,26,13,74,18],
            19: [23,59,88,70,98]
        }

        const actual = groupBy(testArray, 5);

        assert.deepStrictEqual(actual,expected);
    });

    it('tests for N=3 with number array', ()=>{
        const testArray = [
            941,1760,5146,
            2324,1390,380,
            2067,1351,170,
            3308,3280,3469,
            49,2655,2137,
            1262,4873,398,
            2541,1473,2009,
            4823,612
        ]
        const expected = {
            0: [941,1760,5146],
            1: [2324,1390,380],
            2: [2067,1351,170],
            3: [3308,3280,3469],
            4: [49,2655,2137],
            5: [1262,4873,398],
            6: [2541,1473,2009],
            7: [4823,612]
        }

        const actual = groupBy(testArray, 3);

        assert.deepStrictEqual(actual, expected);
    });
});
