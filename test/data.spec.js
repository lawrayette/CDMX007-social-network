require('../src.app.js')


describe('firebaseInit debería ser una función', ()=>{
    it('Es una función', ()=>{
        expect(typeof window.sciFilms.filterByTitle).toEqual('function')
    });
});