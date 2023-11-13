import { useForm } from 'react-hook-form';
import gql from "graphql-tag"
import request from 'graphql-request'
import { useEffect, useState} from 'react'
import { useMutation } from '@tanstack/react-query'
import AttributesContainer from "./AttributesContainer";
import ClassContainer from './ClassContainer';
import StressContainer from './StressContainer';
import HarmContainer from './HarmContainer';
import DeleteEntry from '../fetch/DeleteEntry';
import { useProfileStore, useUserStore } from "../stores/MainStore"
import DeleteEntryVerifyBox from './DeleteEntryVerifyBox';
import EquipmentContainer from './EquipmentContainer';
import FormerProfessionContainer from './FormerProfessionContainer';
import toast from 'react-hot-toast';

const MUTATE_CHARACTER = gql`

    mutation (
        $id: ID,
        $title: String,
        $aiming: Number, 
        $athletics: Number,
        $communication: Number,
        $healing: Number,
        $insight: Number,
        $lore: Number,
        $nature: Number,
        $perception: Number,
        $performance: Number,
        $stealth: Number,
        $striking: Number,
        $tinker: Number,
        $stress: Number,
        $mannerismPicker: [Int],
        $text01: String,
        $text02: String,
        $text03: String,
        $text04: String,
        $text05: String,
        $armorValue: Number,
        $climbingToolValue: Number,
        $demolitionToolValue: Number,
        $disguiseValue: Number,
        $documentsValue: Number,
        $firstAidValue: Number,
        $lightSourceValue: Number,
        $loadValue: String,
        $meleeWeaponValue: Number,
        $navigationalToolValue: Number,
        $performanceToolValue: Number,
        $rangedWeaponValue: Number,
        $shieldValue: Number,
        $tinkeringToolValue: Number,
        $unusualWeaponValue: Number,
        $variableEquipmentSlotOneDescription: String,
        $variableEquipmentSlotOneValue: Number
    ) {
        save_characters_default_Entry (
            id: $id,
            title: $title,
            aiming: $aiming,
            athletics: $athletics,
            communication: $communication,
            healing: $healing,
            insight: $insight,
            lore: $lore,
            nature: $nature,
            perception: $perception,
            performance: $performance,
            stealth: $stealth,
            striking: $striking,
            tinker: $tinker,
            stress: $stress,
            mannerismPicker: $mannerismPicker,
          	text01: $text01,
            text02: $text02,
            text03: $text03,
            text04: $text04,
            text05: $text05,
            armorValue: $armorValue,
            climbingToolValue: $climbingToolValue,
            demolitionToolValue: $demolitionToolValue,
            disguiseValue: $disguiseValue,
            documentsValue: $documentsValue,
            firstAidValue: $firstAidValue,
            lightSourceValue: $lightSourceValue,
            loadValue: $loadValue,
            meleeWeaponValue: $meleeWeaponValue,
            navigationalToolValue: $navigationalToolValue,
            performanceToolValue: $performanceToolValue,
            rangedWeaponValue: $rangedWeaponValue,
            shieldValue: $shieldValue,
            tinkeringToolValue: $tinkeringToolValue,
            unusualWeaponValue: $unusualWeaponValue,
            variableEquipmentSlotOneDescription: $variableEquipmentSlotOneDescription,
            variableEquipmentSlotOneValue: $variableEquipmentSlotOneValue
          ){
          title
            ...on characters_default_Entry {
                aiming
                athletics
                communication
                healing
                insight
                lore
                nature
                perception
                performance
                stealth
                striking
                tinker
                stress
                mannerismPicker {
                  id
                }
                text01
                text02
                text03
                text04
                text05
                armorValue
                climbingToolValue
                demolitionToolValue
                disguiseValue
                documentsValue
                firstAidValue
                lightSourceValue
                loadValue
                meleeWeaponValue
                navigationalToolValue
                performanceToolValue
                rangedWeaponValue
                shieldValue
                tinkeringToolValue
                unusualWeaponValue
                variableEquipmentSlotOneDescription
                variableEquipmentSlotOneValue
                
            }
        }
    }
`

const DELETE_ENTRY = gql`
    mutation DeleteEntry($id: Int!) {
        deleteEntry(id: $id)
    }

`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}


    



export default function CharacterSheet({character}) {

    const [verifyDeleteActive, setVerifyDeleteActive] = useState(false)
    
    const updateProfPage = useProfileStore(state => state.updateProfPage)
    const incrimentReloadState = useUserStore(state => state.incrimentReloadState)
    
    let limit = 7    
    let values = character
    
    

    
    const { register, handleSubmit, resetField, watch, control, setValue, reset, formState: { isDirty, dirtyFields } } = useForm({
      values
    },{ 
      keepDirtyValues: true 
    });
    if(values.attributesLimit){
      limit = values.attributesLimit
    }

    let mutation = useMutation({
      mutationFn: async (variables) =>
        request({
          url: endpoint,
          document: MUTATE_CHARACTER,
          requestHeaders: headers,
          variables,
      }),
      onError: (error) => {
        toast.error(`Could not update character`, {position: 'top-center',})
      },
      onSuccess: () => {
        toast.success(`Character updated`, {position: 'top-center',})

        

        
      }
    })
    
  
    
    const onSubmit = (data) => {

        let newClassPicker = []
        let newSubClassPicker = []
        let newMannerismPicker = []
        let newGrailsPicker = []

       

        data.armorValue = parseInt(data.armorValue)
        data.climbingToolValue = parseInt(data.climbingToolValue)
        data.demolitionToolValue = parseInt(data.demolitionToolValue)
        data.disguiseValue = parseInt(data.disguiseValue)
        data.documentsValue = parseInt(data.documentsValue)
        data.firstAidValue = parseInt(data.firstAidValue)
        data.lightSourceValue = parseInt(data.lightSourceValue)
        data.meleeWeaponValue = parseInt(data.meleeWeaponValue)
        data.navigationalToolValue = parseInt(data.navigationalToolValue)
        data.performanceToolValue = parseInt(data.performanceToolValue)
        data.rangedWeaponValue = parseInt(data.rangedWeaponValue)
        data.shieldValue = parseInt(data.shieldValue)
        data.tinkeringToolValue = parseInt(data.tinkeringToolValue)
        data.unusualWeaponValue = parseInt(data.unusualWeaponValue)
        data.variableEquipmentSlotOneValue = parseInt(data.variableEquipmentSlotOneValue)

        if(Array.isArray(data.mannerismPicker)){
          data.mannerismPicker.forEach((el) => {
            let newEl = parseInt(el.id)
            newMannerismPicker.push(newEl)
          })
          data.mannerismPicker = newMannerismPicker
        } else {
          data.mannerismPicker = parseInt(data.mannerismPicker)
        }

        mutation.mutate(data)
        
    };

    let characterId = character.id
    let parsedCharacterId = parseInt(characterId)
    
 
      
    const deleteEntry = useMutation({
        mutationFn: async (parsedCharacterId) =>
          request({
            url: endpoint,
            document: DELETE_ENTRY,
            requestHeaders: headers,
            variables: {
              "id": parsedCharacterId
            }
        }),
        onError: (error) => {
          toast.error(`Could not delete entry`, {position: 'top-center',})
        },
        onSuccess: () => {
          toast.success(`Entry deleted`, {position: 'top-center',})
          incrimentReloadState()
          updateProfPage(1)
        }
    })
    
    function deleteCharacter(){
      setVerifyDeleteActive(true)
    }
    
    function verifyDelete(){
      deleteEntry.mutate(parsedCharacterId)
    }
   

    let attributeValues = watch(["athletics", "stealth", "aiming", "striking", "lore", "tinker", "nature", "healing", "insight", "perception", "communication", "performance"])
    let sum = 0;

    for (let i = 0; i < attributeValues.length; i++ ) {
      sum += attributeValues[i];
    }

  

    
    return <div className="flex flex-col gap-5">
        <FormerProfessionContainer formerProfession={character.formerProfessionsPicker} />
        <ClassContainer currentClass={character.classPicker} subclass={ character.subclassPicker}/>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <AttributesContainer control={control} limit={limit} currentAttributeCount={sum} />
            <StressContainer control={control} setValue={setValue} register={register} mannerisms={values.mannerismPicker}/>
            <HarmContainer register={register}/>
            <EquipmentContainer control={control} />

            {isDirty ? <input type="submit" value="Save" className="bg-gColorOne cursor-pointer hover:bg-gColorTwo text-white py-2 w-60 mx-auto sticky bottom-0" /> : null}
        </form>
        <div>
        <button onClick={deleteCharacter} className="text-gColorOne cursor-pointer underline">Delete Character</button>
        </div>
        
        {verifyDeleteActive ? <DeleteEntryVerifyBox verifyDelete={verifyDelete} /> : null}
    </div>
}