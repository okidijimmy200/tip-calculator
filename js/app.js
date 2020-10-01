(function() {

    // --create options and insert them dynamically
    const services = [
        // --object and key value pairs
        {
            value:1,
            title: 'great - 20%'
        },
        {
            value:2,
            title: 'ok - 10%'
        },
        {
            value:3,
            title: 'bad -2%'
        },
    ]
    // add select options to the select element
        // --loop through array
        services.forEach(function(service){
            const option = document.createElement('option')
            option.textContent = service.title // to see the 20%, 10%, 2%
            option.value = service.value //initial value is 0 from e html

            // --for the select element
            document.getElementById('input-service').appendChild(option)
        });
 
//  get all the values
        const form = document.getElementById('tip-form')
        const amount = document.getElementById('input-bill')
        const users = document.getElementById('input-users')
        const service = document.getElementById('input-service')

//  cutomer feedback incase something is wrong, we have a loader
        const feedback = document.querySelector('.feedback')
        const loader = document.querySelector('.loader')
        const results = document.querySelector('.results')

//  --submit the form
        form.addEventListener('submit', function(event){
            event.preventDefault(); // this is to enable us see what happens everytime we submit the form
            let bill = amount.value  // bill
            let people = users.value; //people
            let quality = service.value

            // to check if the bill, people, quality is not -ve or zero , weuse strings here not nos
            if(bill === '' || bill <= '0' || (people === '' || people <= '0' || quality === '0')){
                feedback.classList.add('showItem', 'alert-danger');
                feedback.innerHTML = `
                <p>Please check the values</p>
                <p>Bill amount cannot be less than zero</p>
                <p>People sharing the bill cannot be less than zero</p>
                <p>Service has to be selected</p>
                `;
                // hide the text after 10 seconds,setTimeout callback func wch tells us what happens when the timer expires and the time it expires
                setTimeout(function(){
                    // --what happens after timeout
                    feedback.classList.remove('showItem', 'alert-danger')
                }, 10000)
            }
            else {
                feedback.classList.add('showItem', 'alert-success');
                feedback.innerHTML = `
                <p>Calculating...</p> `;
                loader.classList.add('showItem'); // loader
                setTimeout(function(){
                    loader.classList.remove('showItem');
                    feedback.classList.remove('showItem', 'alert-success')

                    // --remove form
                    showResults(bill, people, quality);
                    clearForm();
                },4000)
            }
        })

    //  show results func
        function showResults(bill, people, quality){
            // --var with %
            let percent = 0; // from our qulaity box

            if(quality === '1'){
                percent = 0.2 // for 20 percent
            }
            else if(quality === '2'){
                percent = 0.1;
            }
            else if(quality === '3'){
                percent = 0.02;
            }

        // ---tip amount
        let tipamount = parseInt(bill) * percent;
        let total = parseInt(bill) + tipamount;

        let person = total / parseInt(people) // for each person in the group

        results.classList.add('showItem');
        document.getElementById('tip-amount').textContent = tipamount
        document.getElementById('total-amount').textContent = total
        document.getElementById('person-amount').textContent = person.toFixed(2) // to remove decimals

        }


// --working on a clearForm
        function clearForm () {
            amount.value = ''
            users.value = ''
            service.value = '0'
        }

})()