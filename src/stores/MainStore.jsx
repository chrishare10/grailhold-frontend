import { create } from 'zustand'

export const useHexStore = create((set, get) => ({
    hex: {id: null, entry: null},
    hexHover: null,
    oldHex: null,
    detailState: false,
    detailsPanelState: false,
    detailsPage: 1,
    entriesContainerState: 1,
    commentState: null,

    updateHex: (e) => {
        let oldHex = get().oldHex
        
        set({ hex: e })
        set({ oldHex: get().hex.id })
        
        const updateDetails = get().updateDetailsState
        updateDetails()
    },
    updateHexHover: (e) => {
        set({ hexHover: e })
    },
    updateDetailsState: (e) => {
        const detailState = get().detailState
        const hex = get().hex
        const oldHex = get().oldHex

        set({detailsPanelState: e})

        if(detailState === false ){set({ detailState: true, detailsPanelState: true })}
    },
    updateEntriesContainerState: (e) => {
        set({ entriesContainerState: e })
    },
    updateDetailsPage: (e) => {
        set({ detailsPage: e })
    },
    updateCommentState: (e) => {
        set({ commentState: e })
    },
}))

export const useNavStore = create((set, get) => ({
    navState: false,
    updateNavState: (e) => {
        const navState = get().navState
        if( e === false){set({navState: false})}else if(navState === false ){set({ navState: true })}else{set({navState: false})}
    }
}))

export const useAboutStore = create((set, get) => ({
    aboutState: false,
    updateAboutState: (e) => {
        const aboutState = get().aboutState
        if( e === false){set({aboutState: false})}else if(aboutState === false ){set({ aboutState: true })}else{set({aboutState: false})}
        console.log("clicked")
    }
}))

export const useUserStore = create((set, get) => ({
    userState: false,
    username: false,
    userGM: false,
    email: false,
    name: false,
    userId: false,
    characters: false,
    jwt: false,
    logoutState: false,
    reloadState: 1,

    updateUserState: (e) => {
        set({ userState: e })
    },
    updateUser: (e) => {
        
        set({ 
            userState: e.userId,
            username: e.username,
            email: e.email,
            name: e.name,
            characters: e.characters,
            userId: e.userId,
            userGM: e.userGM
         })
         
         
    },
    updateCharacters: (e) => {
        set({ 
            characters: e,  
        })
    },
    reloadCharacters: (e) => {
        set({ reloadState: get().reloadState + 1 })
    },
    updateLogoutState: (e) => {
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("refreshToken");
        set({ 
            logoutState: e,  
            userState: false,
            username: false,
            email: false,
            name: false,
            userId: false,
            characters: false,
        })
    },
    incrimentReloadState: () => set((state) => ({ reloadState: state.reloadState + 1 }))
    
}))

export const useRegisterStore = create((set, get) => ({
    registerPanelState: false,
    registerState: false,
    registerAttempt: 1,
    username: false,
    email: false,
    name: false,
    updateRegisterAttempt: () => set((state) => ({ registerAttempt: state.registerAttempt + 1 })),
    updateRegisterState: (e) => {
        let currentRegisterState = get().registerState
        if(e !== currentRegisterState ){
            set({registerState: e})
        }
    },
    updateRegisterPanelState: (e) => {
        set({ registerPanelState: e })
    },
}))

export const useLoginStore = create((set, get) => ({
    loginPanelState: true,
    loginState: false,
    loginAttempt: 1,
    username: false,
    email: false,
    jwt: false,
    
    updateLoginAttempt: () => set((state) => ({ loginAttempt: state.loginAttempt + 1 })),
    updateLoginState: (e) => {
        let currentLoginState = get().loginState
        if(e !== currentLoginState ){
            set({loginState: e})
        }
    },
    updateLoginPanelState: (e) => {
        set({ loginPanelState: e })
    },
   
}))

export const useProfileStore = create((set, get) => ({
    profileState: false,
    profPage: 1,
    updateProfileState: (e) => {
        set({ profileState: e })
    },
    updateProfPage: (e) => {
        set({ profPage: e })
    }
}))

export const useRulesStore = create((set, get) => ({
    rulesPanelState: false,
    rulesState: true,
    generatorState: false,
    diceState: false,
    dicePanelState: false,
    numberOfDice: 1,
    result: [],
    updateRulesPanelState: (e) => {
        set({ rulesPanelState: e })
    },
    updateRulesState: (e) => {
        set({ rulesState: e })
    },
    updateGeneratorState: (e) => {
        set({ generatorState: e })
    },
    updateDiceState: (e) => {
        set({ diceState: e })
    },
    updateDicePanelState: (e) => {
        set({ dicePanelState: e })
    },
    addDice: () => {
        set({ numberOfDice: get().numberOfDice + 1 })
    },
    removeDice: () => {
        set({ numberOfDice: get().numberOfDice - 1 })
    },
    updateResult: (e) => {
        set({result: e })
    }
}))

export const useFixtureStore = create((set, get) => ({
    fixtureState: false,
    
    updateFixtureState: () => {
        set({ fixtureState: get().fixtureState + 1 })
    }
}))

export const useCharacterStore = create((set, get) => ({
    characterId: false,
    title: null,
   
    updateCharacterId: (e) => {
        set({characterId: e})
    },
    updateCharacter: (e) => {
        set({ 
            characterId: e.id,
            title: e.title,
            
        })
    }
}))


export const useMutateCharacterStore = create((set, get) => ({
    characterId: false,
    title: null,
    
    updateMutateCharacter: (e) => {
        set({ 
            characterId: e.id,
            title: e.title,
            
        })
    }
}))

export const useEncounterStore = create((set, get) => ({
    encounterState: false,
    encounterChanceState: false,
    encounterPerc: 20,
    updateEncounterState: () => {
        set({ encounterState: get().encounterState + 1 })
    },
    calcEncounterChance: (mod) => {
        if(!mod){
            mod = 0
        }
        let encounterPerc = get().encounterPerc
        let newPerc = encounterPerc + mod

        let roll = Math.floor(Math.random() * 100) + 1;

        if(roll <= newPerc){
            set({ encounterChanceState: true })
        }else {
            set({ encounterChanceState: false })
        }
        console.log(roll + ", " + get().encounterChanceState )

    }
}))

export const useEntryStore = create((set, get) => ({
    entryState: false,

    updateEntryState: (state) => {
        set({ 
            entryState: state
        })
    }
}))