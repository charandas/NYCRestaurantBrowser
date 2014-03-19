describe('search:', function() {
  before(function() {
    return casper.start('http://localhost:9000')
  })

  describe('filters:', function() {
    it('should have borough choices in page', function() {

      casper.then(function() {
        'Borough'.should.be.textInDOM
        'Bronx'.should.be.textInDOM
        'Brooklyn'.should.be.textInDOM
        'Manhattan'.should.be.textInDOM
        'Queens'.should.be.textInDOM
      })
    })

    it('should have category choices in page', function() {
      var upcase = function(string) {
        if (!string) {
          return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      var categories = ['asian', 'mexican', 'sandwiches', 'thai', 'american', 'cuban', 'italian', 'diner', 'seafood',
             'south american', 'café', 'BBQ', 'ice cream', 'gastropub', 'bakery', 'greek', 'ramen / noodles',
             'vegetarian / vegan', 'latin american', 'new american', 'french', 'pizza'];
      casper.then(function() {
        'Category'.should.be.textInDOM
        for (var i = 0; i < categories.length; i++) {
          upcase(categories[i]).should.be.textInDOM
        }
      })
    })

    it('should have name selector in page', function() {

      casper.then(function() {
        'Name'.should.be.textinDOM
      })
    })

    it ('should filter by borough', function() {
      var selector = 'select[name="boroughSelector"]';

      casper.then(function(){
        selector.should.be.inDOM.and.be.visible
      })

      casper.then(function() {
        this.evaluate(function(option, sel) {
          var options = document.querySelectorAll(sel + " option");

          if (option < options.length) {
            var ret = (sel + ' option[value="'+ option.toString() +'"]');
            var el = document.querySelector(ret);
            el.selected = true;
            ['change', 'input'].forEach(function(name) {
              var event = document.createEvent("HTMLEvents");
              event.initEvent(name, true, true);
              el.dispatchEvent(event);
            });
          }
          return true;
        }, 3, selector);

        casper.then(function() {
          'p#results-count'.should.have.text('Showing 1-10 of 10 results')
        })
      })
    })

    it('should filter by name', function() {
      casper.then(function(){
        this.fill('form#filter-form', {
          "nameSelector": "Thai"
        }, true);
        'p#results-count'.should.have.text('Showing 1-1 of 1 results')
      })
    })
  })
})
