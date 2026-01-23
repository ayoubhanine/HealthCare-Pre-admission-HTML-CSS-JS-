const messageDiv=document.getElementById("message");
const form=document.getElementById("FormDemande");
const tableBody=document.getElementById("tableBody");

let currentPage = 1;
const itemsPerPage = 5;

let demandes=JSON.parse(localStorage.getItem("demandes"))||[]
function saveDemandes(){
localStorage.setItem("demandes",JSON.stringify(demandes))


}
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
    const totalPages = Math.ceil(demandes.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {    // dans ce cas : client < =5
        currentPage = totalPages;
    }
     const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const demandesPage = demandes.slice(start, end);
    for(let i=0;i<demandesPage.length;i++){
        const tr=document.createElement("tr");
         const index = (currentPage - 1) * itemsPerPage + i; // index réel dans page de pagination
        tr.innerHTML='<td>'+demandesPage[i].nom+'</td>'+
                    '<td>'+demandesPage[i].prenom+'</td>'+
                    '<td>'+demandesPage[i].tel+'</td>'+
                    '<td>'+demandesPage[i].email+'</td>'+
                    '<td>'+demandesPage[i].motif+'</td>'+
                    '<td>'+demandesPage[i].date+'</td>'+
                    '<td>'+'<button class="btn-delete" onclick="supprimmerDemande('+ index +')">'+'supprimer'+'</button>'+'</td>';
                    tableBody.appendChild(tr);
 }
updatePagination(totalPages)
 }
 function updatePagination(totalPages) {
    const pageInfo = document.getElementById("pageInfo");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    pageInfo.textContent = "Page "+ currentPage+ "/" + (totalPages || 1);

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}
    function supprimmerDemande(index){
        demandes.splice(index,1);
        saveDemandes();
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
            saveDemandes();
            currentPage = Math.ceil(demandes.length / itemsPerPage);
            afficherDemandes();
            afficherMessage("Demande ajoutée avec succès","success");
            form.reset();  // Vider les shamps de formulaire 
   }
    else{
          afficherMessage("Veuillez compléter les champs obligatoires", "error");  
    }

    })
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        afficherDemandes();
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(demandes.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        afficherDemandes();
    }
});


document.addEventListener("DOMContentLoaded", afficherDemandes);
