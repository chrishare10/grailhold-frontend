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
import GetClasses from "../fetch/GetClasses";
import { useProfileStore, useUserStore } from "../stores/MainStore"
import DeleteEntryVerifyBox from './DeleteEntryVerifyBox';
import EquipmentContainer from './EquipmentContainer';
import FormerProfessionContainer from './FormerProfessionContainer';
import toast from 'react-hot-toast';
import AncestryContainer from './AncestryContainer';

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
        $rationsValue: Number,
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
            rationsValue: $rationsValue,
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
                rationsValue
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
    
    

    
    const { register, handleSubmit, resetField, watch, control, setValue, getValues, reset, formState: { isDirty, dirtyFields } } = useForm({
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
        data.rationsValue = parseInt(data.rationsValue)
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

    let classEntries = []
    let classes = GetClasses()
    if(classes) {
      classEntries = classes.entries     
    }

    let minorAtt
    let majorAtt
    let parsedClassId = parseInt(character.classPicker[0].id)
    

      for (let i = 0; i < classEntries.length; i++) {
        const el = classEntries[i];
  
        let parsedId = parseInt(el.id)

        if(parsedClassId === parsedId){
          
            if(el.aiming !== 0){
              if(el.aiming === 1){
                minorAtt = "aiming"
              }else if(el.aiming === 2){
                majorAtt = "aiming"
              } 
            }
  
            if(el.athletics !== 0){
              if(el.athletics === 1){
                minorAtt = "athletics"
              }else if(el.athletics === 2){
                majorAtt = "athletics"
              } 
            }
  
            if(el.communication !== 0){
              if(el.communication === 1){
                minorAtt = "communication"
              }else if(el.communication === 2){
                majorAtt = "communication"
              }
            }
  
            if(el.healing !== 0){
              if(el.healing === 1){
                minorAtt = "healing"
              }else if(el.healing === 2){
                majorAtt = "healing"
              }
            }
            
            if(el.insight !== 0){
              if(el.insight === 1){
                minorAtt = "insight"
              }else if(el.insight === 2){
                majorAtt = "insight"
              }
            }
  
            if(el.lore !== 0){
              if(el.lore === 1){
                minorAtt = "lore"
              }else if(el.lore === 2){
                majorAtt = "lore"
              }
            }
  
            if(el.nature !== 0){
              if(el.nature === 1){
                minorAtt = "nature"
              }else if(el.nature === 2){
                majorAtt = "nature"
              }
            }
  
            if(el.perception !== 0){
              if(el.perception === 1){
                minorAtt = "perception"
              }else if(el.perception === 2){
                majorAtt = "perception"
              }
            }
  
            if(el.performance !== 0){
              if(el.performance === 1){
                minorAtt = "performance"
              }else if(el.performance === 2){
                majorAtt = "performance"
              }
            }
  
            if(el.stealth !== 0){
              if(el.stealth === 1){
                minorAtt = "stealth"
              }else if(el.stealth === 2){
                majorAtt = "stealth"
              }
            }  
  
            if(el.striking !== 0){
              if(el.striking === 1){
                minorAtt = "striking"
              }else if(el.striking === 2){
                majorAtt = "striking"
              }
            }
  
            if(el.tinker !== 0){
              if(el.tinker === 1){
                minorAtt = "tinker"
              }else if(el.tinker === 2){
                majorAtt = "tinker"
              }
            }
        }
      }
   
    

    return <div className="flex flex-col gap-5">
        {character.ancestryPicker.length ? <AncestryContainer ancestry={character.ancestryPicker} /> : null }
        <FormerProfessionContainer formerProfession={character.formerProfessionsPicker} />
        <ClassContainer currentClass={character.classPicker} subclass={ character.subclassPicker}/>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <AttributesContainer control={control} limit={limit} currentAttributeCount={sum} setValue={setValue} getValues={getValues} minorAtt={minorAtt} majorAtt={majorAtt}/>
            <StressContainer control={control} setValue={setValue} register={register} mannerisms={values.mannerismPicker}/>
            <HarmContainer register={register}/>
            <EquipmentContainer control={control} setValue={setValue} register={register} />

            {isDirty ? <input type="submit" value="Save" className="cursor-pointer bg-gColorOne hover:bg-gColorTwo text-white py-2 w-60 mx-auto sticky bottom-0" /> : null}
        </form>
        <div>
          <button onClick={deleteCharacter} className="text-gColorOne cursor-pointer underline">Delete Character</button>
        </div>
        
        {verifyDeleteActive ? <DeleteEntryVerifyBox verifyDelete={verifyDelete} /> : null}
    </div>
}