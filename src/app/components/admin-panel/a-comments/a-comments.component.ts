import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { CommentService } from 'src/app/services/comment.service';
import { Yorumdto } from 'src/app/models/yorumdto';

@Component({
  selector: 'app-a-comments',
  templateUrl: './a-comments.component.html',
  styleUrls: ['./a-comments.component.css'],
  providers: [ConfirmationService],
})
export class ACommentsComponent implements OnInit {

  constructor(
    private commentService:CommentService,
    private confirmationService: ConfirmationService,
    private toastrService:ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllComments()
  }
  commentsDto:Yorumdto[]=[]
  selectedComments:Yorumdto[]=[]
  list:number[]=[]
  getAllComments(){
    this.commentService.getAllDto().subscribe((response)=>{
      this.commentsDto=response.data
      
    })
  }

  deleteSelectComments() {
    this.confirmationService.confirm({
        message: 'Seçili Yorumlar Gizlenecek!!',
        header: 'DİKKAT',
        icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.hiddenComments()
                this.selectedComments = null;
                this.toastrService.info("Seçili Yorumlar Gizlendi");
            }            
    });
  }

  hiddenComments(){
    this.selectedComments.forEach(item => {
      this.list.push(item.commentID)
    });
    this.commentService.hidden(this.list).subscribe(response=>{
      this.list=null  
      this.ngOnInit()
    })
  }

}
