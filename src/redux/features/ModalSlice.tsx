import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
    name : 'modal',
    initialState : {
      AddFriendModal : {
        open : false,
      },
      CreateGroupModal : {
        open : false,
      },
      ConfirmRemoveFriendModal : {
        open : false,
        meta : {
            friend : null
        }
      },

      ConfirmBlockFriendModal : {
        open : false,
        meta : {
            friend : null
        }
      },

      FriendDetailsModal : {
        open : false,
        meta : {
            friend : null
        }
      },
      
      GroupDetailsModal : {
        open : false,
        meta : {
            group : null
        }
      },

      EditModal : {
        open : false,
        meta : {
            user : null,
            whatToUpdate : null,
            updateFn : null
        }
      },



    },
    reducers: {
        closeModal:(state , action)=>{
            state[action.payload].open=false;
        },
        openModal:(state , action)=>{
            console.log({action});
            state[action.payload.filename] = {
                ...state[action.payload.filename],
                open : true,
                meta : action.payload.meta
            };

        },
        
    }
})

export default ModalSlice.reducer;
export const {
    closeModal,
    openModal
} = ModalSlice.actions;
