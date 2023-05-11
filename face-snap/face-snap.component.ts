import { Component, OnInit, Input} from '@angular/core';
import {FaceSnap} from "../model/face-snap.model";
import {FaceSnapsService} from "../services/face-snaps.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.css']
})
export class FaceSnapComponent implements OnInit {
  @Input()faceSnap! : FaceSnap;

  title!: string;
  description!: string;
  createdDate!: Date;
  snaps!: number;
  imageUrl!: string;
  buttonText!: string;

  constructor(private faceSnapsService: FaceSnapsService,
              private router: Router) {}
  ngOnInit() {
   this.buttonText = "oh snaps !";
  }

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }

  onSnap() {
    if (this.buttonText === "oh snaps !") {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
      this.buttonText = "Yeah, je kiff!";
    } else {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id,'jeKiff');
      this.buttonText = "oh snaps !";

    }
  }


}
