import { useForm } from 'react-hook-form';
import GetClasses from "../fetch/GetClasses";
import GetSubClasses from "../fetch/GetSubClasses";
import GetFormerProfessions from "../fetch/GetFormerProfessions";
import gql from "graphql-tag"
import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import ClassesContainer from './ClassesContainer';
import CharacterName from './CharacterName';
import AttributesBuilderContainer from "./AttributesBuilderContainer";
import { useEffect, useState } from "react";
import { useUserStore, useCharacterStore, useProfileStore  } from '../stores/MainStore';
import FormerProfessionsContainer from './FormerProfessionsContainer';
import toast from 'react-hot-toast';


const MUTATE_NEW_CHARACTER = gql`
  mutation NewCharacter(
    $title: String, 
    $authorId: ID, 
    $userPicker: [Int],
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
    $classPicker: [Int],
    $subclassPicker: [Int],
    $formerProfessionsPicker: [Int],
    ){
    save_characters_default_Entry(
      title: $title, 
      authorId: $authorId, 
      userPicker: $userPicker,
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
      classPicker: $classPicker,
      subclassPicker: $subclassPicker,
      formerProfessionsPicker: $formerProfessionsPicker
      ) {
      title
      authorId
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
        classPicker {
          id
        }
        subclassPicker {
          id
        }
        userPicker {
          id
        }
        stress
        mannerismPicker {
          id
        }
        formerProfessionsPicker {
          id
        }
      }
    }
  }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}


export default function CharacterBuilderContainer({ userId }) {

  let limit = 7    
  const updateCharacterId = useCharacterStore(state => state.updateCharacterId)
  const updateProfPage = useProfileStore(state => state.updateProfPage)
  const incrimentReloadState = useUserStore(state => state.incrimentReloadState)

  const [classPicker, setClassPicker ] = useState(362)
  

 
    
    let mutation = useMutation({
        mutationFn: async (variables) =>
          request({
            url: endpoint,
            document: MUTATE_NEW_CHARACTER,
            requestHeaders: headers,
            variables
        }),
        onError: (error) => {
          toast.error(`Something went wrong`, {position: 'top-center',})
        },
        onSuccess: () => {
          toast.success(`Character created!`, {position: 'top-center',})
          incrimentReloadState()
          updateProfPage(1)
        }
        
        })
        


    const { register, handleSubmit, watch, control, setValue } = useForm();

    let classEntries = []
    let subClassEntries = []
    let formerProfessionsEntries = []

    let classes = GetClasses()
    if(classes) {
      classEntries = classes.entries     
    }

    let subClasses = GetSubClasses(classPicker)
    if(subClasses) {
      subClassEntries = subClasses.entries
    }

    let formerProfessions = GetFormerProfessions()
    if(formerProfessions) {
      formerProfessionsEntries = formerProfessions.entries
    }


    
    const onSubmit = (data) => {

        let newClassPicker = []
        let newSubClassPicker = []
        let newFormerProfessionsPicker = []
        let newMannerismPicker = []
        let newGrailsPicker = []

        if(Array.isArray(data.classPicker)){
          data.classPicker.forEach((el) => {
            let newEl = parseInt(el.id)
            newClassPicker.push({"id": newEl})
          })
          data.classPicker = newClassPicker
        } else {
          data.classPicker = parseInt(data.classPicker)
        }
      
        if(Array.isArray(data.subclassPicker)){
          data.subclassPicker.forEach((el) => {
            let newEl = parseInt(el.id)
            newSubClassPicker.push({"id": newEl})
          })
          data.subclassPicker = newSubClassPicker
        } else {
          data.subclassPicker = parseInt(data.subclassPicker)
        }

        if(Array.isArray(data.formerProfessionsPicker)){
          data.formerProfessionsPicker.forEach((el) => {
            let newEl = parseInt(el.id)
            newFormerProfessionsPicker.push({"id": newEl})
          })
          data.formerProfessionsPicker = newFormerProfessionsPicker
        } else {
          data.formerProfessionsPicker = parseInt(data.formerProfessionsPicker)
        }

        data.aiming = data.attributes.aiming
        data.athletics = data.attributes.athletics
        data.communication = data.attributes.communication
        data.healing = data.attributes.healing
        data.insight = data.attributes.insight
        data.lore = data.attributes.lore
        data.nature = data.attributes.nature
        data.perception = data.attributes.perception
        data.stealth = data.attributes.stealth
        data.striking = data.attributes.striking
        data.tinker = data.attributes.tinker

        data.userPicker = parseInt(userId)
        data.authorId = parseInt(userId)

        console.log(data)
        mutation.mutate(data)
        
    };

    function handleClick(e){
        if(e.target.id == "back-btn"){
            updateCharacterId(false) 
            updateProfPage(1)
        }
    }

    let attributesObject = {
        aiming: 0,
        athletics: 0,
        communication: 0,
        healing: 0,
        insight: 0,
        lore: 0,
        nature: 0,
        perception: 0,
        performance: 0,
        stealth: 0,
        striking: 0,
        tinker: 0
    }

    
    useEffect(() => {

      for (let i = 0; i < classEntries.length; i++) {
        const el = classEntries[i];
  
        let parsedId = parseInt(el.id)


        
        if(classPicker === parsedId){
          attributesObject = {
            aiming: !el.aiming ? 0 : el.aiming,
            athletics: !el.athletics ? 0 : el.athletics,  
            communication: !el.communication ? 0 : el.communication,
            healing: !el.healing ? 0 : el.healing,
            insight: !el.insight ? 0 : el.insight,
            lore: !el.lore ? 0 : el.lore,
            nature: !el.nature ? 0 : el.nature,
            perception: !el.perception ? 0 : el.perception,
            performance: !el.performance ? 0 : el.performance,
            stealth: !el.stealth ? 0 : el.stealth,
            striking: !el.striking ? 0 : el.striking,
            tinker: !el.tinker ? 0 : el.tinker
          }
          
        }
      }
      setValue("attributes", attributesObject)

    }, [classPicker])
   
   
    let minorAtt
    let majorAtt
    if(classPicker){
      for (let i = 0; i < classEntries.length; i++) {
        const el = classEntries[i];
  
        let parsedId = parseInt(el.id)
        
        if(classPicker === parsedId){
          
            if(el.aiming !== 0){
              if(el.aiming === 1){
                minorAtt = "attributes.aiming"
              }else if(el.aiming === 2){
                majorAtt = "attributes.aiming"
              } 
            }
  
            if(el.athletics !== 0){
              if(el.athletics === 1){
                minorAtt = "attributes.athletics"
              }else if(el.athletics === 2){
                majorAtt = "attributes.athletics"
              } 
            }
  
            if(el.communication !== 0){
              if(el.communication === 1){
                minorAtt = "attributes.communication"
              }else if(el.communication === 2){
                majorAtt = "attributes.communication"
              }
            }
  
            if(el.healing !== 0){
              if(el.healing === 1){
                minorAtt = "attributes.healing"
              }else if(el.healing === 2){
                majorAtt = "attributes.healing"
              }
            }
            
            if(el.insight !== 0){
              if(el.insight === 1){
                minorAtt = "attributes.insight"
              }else if(el.insight === 2){
                majorAtt = "attributes.insight"
              }
            }
  
            if(el.lore !== 0){
              if(el.lore === 1){
                minorAtt = "attributes.lore"
              }else if(el.lore === 2){
                majorAtt = "attributes.lore"
              }
            }
  
            if(el.nature !== 0){
              if(el.nature === 1){
                minorAtt = "attributes.nature"
              }else if(el.nature === 2){
                majorAtt = "attributes.nature"
              }
            }
  
            if(el.perception !== 0){
              if(el.perception === 1){
                minorAtt = "attributes.perception"
              }else if(el.perception === 2){
                majorAtt = "attributes.perception"
              }
            }
  
            if(el.performance !== 0){
              if(el.performance === 1){
                minorAtt = "attributes.performance"
              }else if(el.performance === 2){
                majorAtt = "attributes.performance"
              }
            }
  
            if(el.stealth !== 0){
              if(el.stealth === 1){
                minorAtt = "attributes.stealth"
              }else if(el.stealth === 2){
                majorAtt = "attributes.stealth"
              }
            }  
  
            if(el.striking !== 0){
              if(el.striking === 1){
                minorAtt = "attributes.striking"
              }else if(el.striking === 2){
                majorAtt = "attributes.striking"
              }
            }
  
            if(el.tinker !== 0){
              if(el.tinker === 1){
                minorAtt = "attributes.tinker"
              }else if(el.tinker === 2){
                majorAtt = "attributes.tinker"
              }
            }
  
          
          
        }
      }

    }

    let attributeValues = watch(["attributes.athletics", "attributes.stealth", "attributes.aiming", "attributes.striking", "attributes.lore", "attributes.tinker", "attributes.nature", "attributes.healing", "attributes.insight", "attributes.perception", "attributes.communication", "attributes.performance"])
    let sum = 0;

    for (let i = 0; i < attributeValues.length; i++ ) {
      sum += attributeValues[i];
    }
    
    
    return <div className="pb-14 flex flex-col gap-5">
        <div>
          <button id="back-btn" onClick={handleClick}>Back to profile</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <CharacterName register={register}/>
            <FormerProfessionsContainer register={register} formerProfessionsEntries={formerProfessionsEntries}/>
            <ClassesContainer register={register} watch={watch} classEntries={classEntries} subClassEntries={subClassEntries} classPicker={classPicker} setClassPicker={setClassPicker} /> 
            <AttributesBuilderContainer  limit={limit} register={register} control={control} majorAtt={majorAtt} minorAtt={minorAtt} currentAttributeCount={sum}/> 
            <input type="submit" className="bg-blue-300 cursor-pointer hover:bg-blue-400 font-bold py-2 w-60 mx-auto" />
        </form>
        
    </div>
}