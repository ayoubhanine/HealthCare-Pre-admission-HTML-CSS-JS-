const messageDiv=document.getElementById("message");
const form=document.getElementById("FormDemande");
const tableBody=document.getElementById("tableBody");

let demandes=[];
function  afficherMessage(texte,type){
    messageDiv.textContent=texte;
    messageDiv.className='message '+ type;
    messageDiv.style.display="block";
    setTimeout(() => {
    messageDiv.style.display = "none";
  }, 4000);
    
}
   function afficherDemandes(){
    tableBody.innerHTML=""
    for(let i=0;i<demandes.length;i++){
        const tr=document.createElement("tr");
        tr.innerHTML='<td>'+demandes[i].nom+'</td>'+
                    '<td>'+demandes[i].prenom+'</td>'+
                    '<td>'+demandes[i].tel+'</td>'+
                    '<td>'+demandes[i].email+'</td>'+
                    '<td>'+demandes[i].motif+'</td>'+
                    '<td>'+demandes[i].date+'</td>'+
                    '<td>'+'<button class="btn-delete" onclick="supprimmerDemande('+ i +')">'+'supprimer'+'</button>'+'</td>';
                    tableBody.appendChild(tr);
 }

 }
    function supprimmerDemande(index){
        demandes.splice(index,1);
        afficherDemandes();}
    
    
    form.addEventListener("submit", function(e){
         e.preventDefault();
        const nom=document.getElementById("nom").value.trim();
        const prenom=document.getElementById("prenom").value.trim();
        const tel=document.getElementById("tel").value.trim();
        const email=document.getElementById("email").value.trim();
        const motif=document.getElementById("motif").value;
        const date=document.getElementById("date").value;
   if (nom && prenom && tel && email && motif && date) { 
    const demande={
                nom,prenom,tel,email,motif,date
            };
            demandes.push(demande);
            afficherDemandes();
            afficherMessage("Demande ajoutée avec succès","success");
            form.reset();  // Vider les shamps de formulaire 
   }
    else{
          afficherMessage("Veuillez compléter les champs obligatoires", "error");  
    }

    })


