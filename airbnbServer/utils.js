//Author - Shreyash Ghare
// Date - 13/10/2024

// IF any error occurs in application we need to send error informtaion to send the user with status code as error
function createErrorResult(error) {
    console.log(error)
    return { status: 'error', error }
}
// When Request(get , post , put , delete ) process sucessfully we need to send data along with status code as a success
function createSuccessResult(data) {
    return { status: 'success', data }
}
 // Creating   final result depending on status
 function createResult(error, data) {
     return error ? createErrorResult(error) :
     createSuccessResult(data)
    }
    
// To make available all three functions in other js file
module.exports = {
    createResult,
    createSuccessResult,
    createErrorResult,
}