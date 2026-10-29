@echo off
set JAVA_HOME=C:\Users\nagab\.jdks\temurin-21.0.11
set PATH=%JAVA_HOME%\bin;%PATH%
"%~dp0apache-maven-3.9.9\bin\mvn.cmd" %*
