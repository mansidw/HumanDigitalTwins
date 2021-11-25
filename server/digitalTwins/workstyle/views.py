from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from pyresparser import ResumeParser
from django.conf import settings
import os
from rest_framework import status
from django.core.files.storage import FileSystemStorage
import nltk
nltk.download('stopwords')

# Create your views here.

class JobRecommendation(APIView):
    def get(self,request):
        resume = request.FILES.get('resume')
        fss = FileSystemStorage()
        file = fss.save(resume.name.strip().replace(' ',''), resume)
        file_url = fss.url(file)
        file_url.strip().replace(' ','')
        print(file_url)
        file_url= file_url[1:]
        
        #str(resume.name).replace(" ","_
        #path = settings.BASE_DIR + os.path.join(settings.MEDIA_URL, resume.name)
        
        data = ResumeParser(file_url).get_extracted_data()
        print(data)
        if data:
            return Response({'data':data['skills']},status=status.HTTP_200_OK)
        return Response({'data':'error'})

