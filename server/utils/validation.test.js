const expect = require('expect');
const {isRealString} = require('./validation');
// import isRealstring

//isRealString
    // should reject non-string values
    // should reject string with only spaces   
    // should allow string with non-space characters

describe('isRealString', ()=>{
    it('should reject non-string values', ()=>{
        const res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', ()=>{
        const res = isRealString('      ');
        expect(res).toBe(false);
    })

    it('should allow string with non-space characters', ()=>{
        const res = isRealString('0');
        expect(res).toBe(true);
    })
})