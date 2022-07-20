import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Comment } from 'src/app/models/comment';
import { Yorum } from 'src/app/models/yorum';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments:Yorum[];
  ca:Category[];
  constructor(private commentService:CommentService
    ) { }

  ngOnInit(): void {
  }

  get(productId:number){
    this.commentService.getByProductId(productId).subscribe(response=>{
      this.comments=response.data
    })
  }
}
