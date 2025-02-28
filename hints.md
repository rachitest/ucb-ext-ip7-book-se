

## Sending search results


- Hint: Remember to set the global state variables with data received

- HINT: The generic code to do a "fetch" is below...

      fetch(url)
          .then(response => response.json())
          .then(data => {
              console.log('data', data);
              // set variables....
          });



## Getting user input

- Hint: Remember to get value from search input


## Constructing the URL

- Hint: API URLs are all in the GET params style, e.g. "&limit=10"

- Hint: Use plus (or backticks) to format the URL with variables, e.g "&limit=" + limit



## Sending search results

- Hint: When sending teh fetch, make sure to set to be loading and rerender

- Hint: After receiving the fetch, make sure to set to be NOT loading (false),
  and rerender



## Rendering results snippet

- Hint: For render, think about how to create this HTML:


        <div class="Books-book">
            <img src="http://covers.openlibrary.org/b/id/14627564-M.jpg" alt="cover">
            <div class="Books-book-details">
                <div class="Books-book-title">The Two Towers</div>
                <strong>Author:</strong> J.R.R. Tolkien<br>
                <strong>Language:</strong> dut,jpn,cat,ast,tur,eng,hun,hrv,cze,ita,ind,afr,baq,chi,bul,dan,swe,por,rus,fre,pol,ger,yid,spa<br>
                <strong>Year Published:</strong> 1954<br>
            </div>
        </div>


- Hint #2: Consider either backticks + innerHTML, or createElement!
