export const displayTextLimit = (text:string, limit:number) => {
    // this function will limit the number of character displayed on a post text
    // sebd the text and the character limit(number of characterss accepted)
    if(text && text && text.length > limit){
        return text.substring(0, limit)+'...';
    }else{
        return text;
    }
}