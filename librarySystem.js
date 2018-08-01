(function(){
  var libraryStorage = {};

  function librarySystem(libraryName, dependencies, callback) {
    
    // Throw exception if incorrect syntax
    if (arguments.length < 1 || arguments.length > 3) {
      throw new RangeError ('Incorrect syntax.  The correct syntax is librarySystem(libraryName, dependencies, callback)')
    }
    // Store library if more than one argument
    if (arguments.length > 1) {
      var dependenciesIsArray = Array.isArray(dependencies);
      // Handle when the second argument is a function instead of an array
      if(!dependenciesIsArray && typeof dependencies == "function") {
        callback = depenencies;
        dependencies = []; 
      } else if (!dependenciesIsArray){
        // Throw exception if the second argument isn't an array or a function
        throw new TypeError ('Second argument must be a string array.')
      }
      
      // Throw exception if any of the dependencies aren't strings
      for (var i = 0 ; i < dependencies.length ; i++) {
        if (typeof dependencies[i] !== "string") {
          throw new TypeError ('All elements in the array must be strings')
        }
      }
      
      // Add the library to storage
      libraryStorage[libraryName] = {
        dependencies: dependencies,
        library: callback
      };
      return;
    } 
    
    // Throw exception if the library doesn't exist
    if (!(libraryName in libraryStorage)) {
      throw new ReferenceError ('Library [' + libraryName + '] does not exist.' );
    }
    
    var returnLibrary = libraryStorage[libraryName];
    var depResults = [];
  
    for (var i = 0 ; i < returnLibrary.dependencies.length ; i++) {
      depResults.push(librarySystem(returnLibrary.dependencies[i]));
    }

    return returnLibrary.library.apply(null, depResults);
  }

  window.librarySystem = librarySystem;
})();