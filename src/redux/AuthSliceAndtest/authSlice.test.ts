import authReducer,{loginSuccess,logout} from "./authSlice";

describe("authSlice test",()=>{
    const mokUser={name:"Eman",email:"Eman@gmail.com"}


    beforeEach(()=>{
        localStorage.clear();
    })    
    it("should return intial state when no user in local storage",()=>{
        const state=authReducer(undefined,{type:""});
        expect(state).toEqual({user:null});

    })
     it("should handle login sucess",()=>{
        const action=loginSuccess(mokUser)
        const state=authReducer({user:null},action);

        expect(state.user).toEqual(mokUser);
        expect(localStorage.getItem("user")).toEqual(JSON.stringify(mokUser));
    })
    it("should handle logout",()=>{
        localStorage.setItem("user",JSON.stringify(mokUser));
        const action=logout();
        const state=authReducer({user:mokUser},action);

        expect(state.user).toBeNull();
        expect(localStorage.getItem("user")).toBeNull();
    })
    
})