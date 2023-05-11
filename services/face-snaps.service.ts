import {Injectable} from "@angular/core";
import {FaceSnap} from "../model/face-snap.model";
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import { map} from 'rxjs/operators';

@Injectable(
  {
    providedIn: "root"
  }
)
export class FaceSnapsService {
  constructor(private http: HttpClient) {}

  faceSnaps: FaceSnap[] = [
    {
      id: 1,
      title: "mon appli de moi",
      description: "elle n'est rien qu'a moi ",
      imageUrl: "https://th.bing.com/th/id/R.db70c3a340670b887b2d379fb9d0d1f5?rik=D2go3N5G19KF8A&pid=ImgRaw&r=0",
      createdDate: new Date(),
      snaps: 0,
      location: "1ere image"
    },
    {
      id: 2,
      title: "deuxieme image",
      description: "c'est la deuxieme",
      imageUrl: "https://th.bing.com/th/id/R.f1958850e5b73469fcfaa9b4efbc23d1?rik=j5BtuL7TrrN1Kw&pid=ImgRaw&r=0",
      createdDate: new Date(),
      snaps: 0,
      location: "2eme image"
    },
    {
      id: 3,
      title: "troisieme image",
      description: "c'est la troisieme",
      imageUrl: "https://th.bing.com/th/id/OIP.llGbaPqp96u8AnosQmsQ-AHaDZ?w=324&h=160&c=7&r=0&o=5&pid=1.7",
      createdDate: new Date(),
      snaps: 0
    }];

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }
  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);

  }


  snapFaceSnapById(faceSnapId: number, snapType: 'snap'| 'jeKiff'): Observable<FaceSnap> {
      return  this.getFaceSnapById(faceSnapId).pipe(

    map(faceSnap => ({
          ...faceSnap,
          snaps: faceSnap.snaps +(snapType ==='snap'? 1: -1)
        })),
        switchMap(updatedFaceSnap => this.http.put<FaceSnap>(
          `http://localhost:3000/facesnaps/${faceSnapId}`,
          updatedFaceSnap)
      ));
  }

  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }) :Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps =>[...facesnaps].sort((a,b)=>a.id - b.id)),
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length -1]),
      map(previousFacesnap => ({
        ...formValue,
        snaps:0,
        createdDate: new Date(),
        id: previousFacesnap.id +1
      })),
      switchMap(newFacesnap =>this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFacesnap)
      )
      );
  }
}
