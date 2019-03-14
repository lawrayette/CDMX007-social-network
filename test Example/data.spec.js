require('../src/data.js');

describe('window.sciFilms debería ser un objeto', () =>{
  it ('es un objeto', ()=>{
      expect (typeof window.sciFilms).toBe('object')
  });
});
describe('filterByTitle debería ser una función', ()=>{
    it('Es una función', ()=>{
        expect(typeof window.sciFilms.filterByTitle).toEqual('function')
    });
});
describe('La función filterByTitle debería filtrar la data por título', ()=>{
    it ('Ordena la data por título', ()=>{
        expect(window.sciFilms.filterByTitle(sciFilmsTest)).toEqual(expect.arrayContaining(filteredByTitle))
    });
});
describe('filterByDirector debería ser una función', ()=>{
    it ('Es una función', ()=>{
        expect(typeof window.sciFilms.filterByDirector).toEqual('function')
    });
});
describe('La función filterByDirector debería filtrar la data por director', ()=>{
    it('Ordena la data por director', ()=>{
        expect(window.sciFilms.filterByDirector(sciFilmsTest)).toEqual(expect.arrayContaining(filteredByDirector))
    });
});
describe('filterByActor debería ser una función', ()=>{
    it ('Es una función', ()=>{
        expect(typeof window.sciFilms.filterByActor).toEqual('function')
    });
});
describe('filterByActor debería filtrar la data por actor', ()=>{
    it ('Ordena la data por actor', ()=>{
        expect(window.sciFilms.filterByDirector).toEqual('function')
    });
});



