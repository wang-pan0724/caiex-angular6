import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  title="个人信息";
  imageUrl ="../../assets/country.jpg"

  constructor() { }

  ngOnInit() {
  }

  successHandle(file: any): void {
    // this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file.raw))
    // this.message.info('文件上传成功')
  }
  
  errorHandle(err: any): void {
    // this.message.error('文件上传失败:' + err)
  }

}
