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
import requests
import nltk
nltk.download('stopwords')

# Create your views here.

class JobRecommendation(APIView):
    def post(self,request):
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
        print(data['skills'])
        print()
        if data:
            skillset=data['skills']
            final_jobs=[]
            skill=[]
            for x in range(0,4):
                skill.append(data['skills'][x])
            for i in skill:
                url = "https://findwork.dev/api/jobs/?location=india&search="+i+"&sort_by=relevance"
                headers={
                    'Authorization' :  'Token 7802efb11c99003ecb6180e240e65695f6dd6a84'
                }
                data={}
                response = requests.request("GET",url, headers=headers)
                if response.status_code==200:
                    jobs = response.json()
                    if jobs['count']==0:
                        pass
                    elif jobs['count']==1:
                        data['id']=jobs['results'][0]['id']
                        data['role']=jobs['results'][0]['role']
                        data['company_name']=jobs['results'][0]['company_name']
                        data['remote']=jobs['results'][0]['remote']
                        data['url']=jobs['results'][0]['url']
                        final_jobs.append(data)
                        print(data)
                        print()

                    else:
                        for y in range(0,2):
                            data={}
                            data['id']=jobs['results'][y]['id']
                            data['role']=jobs['results'][y]['role']
                            data['company_name']=jobs['results'][y]['company_name']
                            data['remote']=jobs['results'][y]['remote']
                            data['url']=jobs['results'][y]['url']
                            final_jobs.append(data)
                            print(data)
                            print()
            if len(final_jobs)==0:
                final_jobs.append('No available jobs matching your skills currently found')

            return Response({'skills':skillset,'jobs':final_jobs},status=status.HTTP_200_OK)
        return Response({'data':'error'})

