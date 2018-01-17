```
describe.only('outer', () => {
  console.log('outer');
  beforeEach(() => {
    console.log('beforeeach of outer');
  });

  it('first it of outer', () => {
    console.log('first it of outer');
  });

  describe('inner', () => {
    console.log('inner');
    beforeEach(() => {
      console.log('beforeeach of inner');
    });

    it('first it of inner', () => {
      console.log('first it or inner');
    });

    it ('second it of inner', () => {
      console.log('second it of inner');
    });

    it('third it of inner', (done) => {
      console.log('third it of inner');
      setTimeout(() => {
        console.log('third it of inner async');
        done();
      }, 1000 * 1);
    });
  });

  it ('second it of outer', () => {
    console.log('second it of outer');
  });

  it('third it of outer', (done) => {
    console.log('third it of outer');
    setTimeout(() => {
      console.log('third it of outer async');
      done();
    }, 1000 * 1);
  });

});

/**
beforeeach of outer
first it of outer
beforeeach of outer
second it of outer
beforeeach of outer
third it of outer
third it of outer async
beforeeach of outer
beforeeach of inner
first it or inner
beforeeach of outer
beforeeach of inner
second it of inner
beforeeach of outer
beforeeach of inner
third it of inner
third it of inner async
 */
```